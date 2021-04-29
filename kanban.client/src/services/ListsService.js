import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class ListsService {
  async getLists(boardId) {
    const res = await api.get(`api/boards/${boardId}/lists`)
    AppState.lists = res.data
  }

  async createList(newList) {
    const res = await api.post('api/lists', newList)
    this.getLists(res.data.boardId)
    // AppState.lists.push(res.data)
  }

  async deleteList(id) {
    await api.delete(`api/lists/${id}`)
    AppState.lists = AppState.lists.filter(b => b.id !== id)
  }
}

export const listsService = new ListsService()
