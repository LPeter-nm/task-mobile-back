const UsersController = () => import('#controllers/users_controller')
const TasksController = () => import('#controllers/tasks_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const SessionController = () => import('#controllers/session_controller')

router.post('session', [SessionController, 'store'])

router.resource('user', UsersController).apiOnly()
router
  .group(() => {
    router.resource('task', TasksController).apiOnly()
  })
  .use(middleware.auth())
