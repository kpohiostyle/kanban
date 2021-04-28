import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class CommentsService {
  async getComments(listId) {
    const res = await api.get(`api/tasks/${listId}/comments`)
    AppState.comments = res.data
  }

  async createComment(newComment) {
    const res = await api.post('api/comments', newComment)
    AppState.comments.push(res.data)
    this.getComments(newComment.list)
    // everytime a car is created, we will change pages
  }

  async deleteComment(id) {
    await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(b => b.id !== id)
  }
}

export const commentsService = new CommentsService()
