import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAll(query) {
    return await dbContext.Boards.find(query)
  }

  async getBoardById(id) {
    const data = await dbContext.Boards.findById(id)
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async createBoard(body) {
    return await dbContext.Boards.create(body)
  }

  async deleteBoard(id) {
    const data = await dbContext.Boards.findByIdAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
    return 'Successfully Deleted'
  }
}

export const boardsService = new BoardsService()
