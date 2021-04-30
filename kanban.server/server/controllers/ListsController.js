import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
import { tasksService } from '../services/TasksService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createList)
      .delete('/:id', this.deleteList)
      .get('/:id/tasks', this.getTasks)
  }

  async getTasks(req, res, next) {
    try {
      const data = await tasksService.getTasks({ listId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await listsService.createList(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const data = await listsService.deleteList(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
