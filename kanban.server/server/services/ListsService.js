import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getLists(query) {
    return await dbContext.Lists.find(query)
  }

  async createList(body) {
    return await dbContext.Lists.create(body)
  }

  async deleteList(id, userId) {
    const data = await dbContext.Lists.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }
}

export const listsService = new ListsService()
