import Task from '#models/task'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.load('tasks')
    return user.tasks
  }
  async store({ request, auth }: HttpContext) {
    const { title } = await request.validateUsing(createTaskValidator)
    const user = auth.user!
    await user.related('tasks').create({
      title,
    })

    return {
      title,
    }
  }
  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      return task
    } catch (error) {
      return response.status(400).json({ error: 'Task not found' })
    }
  }
  async update({ params, response, request }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      const {  done } = await request.validateUsing(updateTaskValidator)
      task.merge({ done })
      await task.save()
      return task
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findByOrFail('id', params.id)
      await task.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({ error: 'Task not found' })
    }
  }
}
