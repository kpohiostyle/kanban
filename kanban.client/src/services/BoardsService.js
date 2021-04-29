import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class BoardsService {
  async getAll() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getActiveBoard(id) {
    const res = await api.get('api/boards/' + id)
    AppState.activeBoard = res.data
  }

  async createBoard(newBoard) {
    const res = await api.post('api/boards', newBoard)
    AppState.boards.push(res.data)
    this.getAll()
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
    AppState.boards = AppState.boards.filter(b => b.id !== id)
  }
}

export const boardsService = new BoardsService()
