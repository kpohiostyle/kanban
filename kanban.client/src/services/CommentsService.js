import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class CommentsService {
  async getComments(taskId) {
    const res = await api.get(`api/tasks/${taskId}/comments`)
    AppState.comments[taskId] = res.data
  }

  async createComment(newComment) {
    const res = await api.post('api/comments', newComment)
    AppState.comments[newComment.taskId].push(res.data)
    this.getComments(res.data.taskId)
  }

  async deleteComment(taskId, id) {
    await api.delete(`api/comments/${id}`)
    AppState.comments[taskId] = AppState.comments[taskId].filter(c => c.id !== id)
  }
}

export const commentsService = new CommentsService()
