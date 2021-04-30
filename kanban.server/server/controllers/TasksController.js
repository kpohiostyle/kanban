import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getComments)
      .post('', this.createTask)
      .put('/:id', this.editTask)
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
      const data = await tasksService.deleteTask(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await tasksService.editTask(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const data = await commentsService.getComments({ taskId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  // async addComment(req, res, next) {
  //   try {
  //     req.body.creatorId = req.userInfo.id
  //     const task = await tasksService.createComment(req.params.id, req.body)
  //     return res.send(task)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async deleteComment(req, res, next) {
  //   try {
  //     const car = await tasksService.deleteComment(req.params.id, req.params.commentId, req.userInfo.id)
  //     return res.send({ message: 'comment removed', data: car })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
