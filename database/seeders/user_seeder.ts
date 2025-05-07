import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'Usuário exemplo',
        email: 'usuario1@example.com',
        password: 'secret',
      },
      {
        name: 'Usuário exemplo 2',
        email: 'usuario2@example.com',
        password: 'secret',
      },
    ])
  }
}
