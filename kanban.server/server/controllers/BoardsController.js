import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import { listsService } from '../services/ListsService'
// import { get } from 'mongoose'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/lists', this.getLists)
      .get('/:id', this.getBoardById)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAll(req, res, next) {
    try {
      const data = await boardsService.getAll({ creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getBoardById(req, res, next) {
    try {
      const data = await boardsService.getBoardById(req.params.id)
      return res.send(data)
    } catch (error) {

    }
  }

  async createBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = boardsService.createBoard(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const data = await boardsService.deleteBoard(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getLists(req, res, next) {
    try {
      const data = await listsService.getLists({ boardId: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
