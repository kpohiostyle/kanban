import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .delete('/:id', this.deleteTask)
  }

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await tasksService.createTask(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.deleteTask(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
