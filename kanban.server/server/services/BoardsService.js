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

  async deleteBoard(id, userId) {
    const data = await dbContext.Boards.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }
}

export const boardsService = new BoardsService()
