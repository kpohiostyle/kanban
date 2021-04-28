import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class ListsService {
  async getLists() {
    const res = await api.get('api/lists')
    AppState.lists = res.data
  }

  async createList(newList) {
    const res = await api.post('api/lists', newList)
    AppState.lists.push(res.data)
    // everytime a car is created, we will change pages
  }

  async deleteList(id) {
    await api.delete('api/lists/' + id)
    AppState.lists = AppState.lists.filter(b => b.id !== id)
  }
}

export const listsService = new ListsService()
