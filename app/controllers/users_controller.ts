import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.query().preload('tasks')

    return users
  }

  async store({ request }: HttpContext) {
    const { email, name, password } = await request.validateUsing(createUserValidator)
    const user = await User.create({ name, email, password })
    return user
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.load('tasks')
      return user
    } catch (error) {
      return response.status(400).json({ error: 'Erro ao deletar usuário' })
    }
  }
}
