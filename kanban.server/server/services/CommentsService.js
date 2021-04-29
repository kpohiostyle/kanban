import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getComments(query) {
    return await dbContext.Comments.find(query)
  }

  async createComment(body) {
    return await dbContext.Comments.create(body)
  }

  async deleteComment(id) {
    const data = await dbContext.Comments.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }
}
export const commentsService = new CommentsService()
