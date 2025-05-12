import Task from '#models/task'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        title: 'Task 1',
        userId: 1,
      },
      {
        title: 'Task 2',
        userId: 1,
      },
      {
        title: 'Task 3',
        userId: 2,
      },
    ])
  }
}
