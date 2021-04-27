import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class BoardsService {
  async getAll() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  //   async getBoardById(id) {
  //     const res = await api.get('boards/' + id)
  //     AppState.boards = res.data
  //   }

  async createBoard(newBoard) {
    const res = await api.post('api/boards', newBoard)
    AppState.boards.push(res.data)
    // everytime a car is created, we will change pages
  }

  async deleteBoard(id) {
    await api.delete('boards/' + id)
    AppState.boards = AppState.boards.filter(b => b.id !== id)
  }
}

export const boardsService = new BoardsService()
