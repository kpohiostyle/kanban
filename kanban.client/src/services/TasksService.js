import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(listId) {
    const res = await api.get(`api/lists/${listId}/tasks`)
    AppState.tasks = res.data
  }

  async createTask(newTask) {
    const res = await api.post('api/tasks', newTask)
    AppState.tasks.push(res.data)
    this.getTasks(newTask.list)
    // everytime a car is created, we will change pages
  }

  async deleteList(id) {
    await api.delete(`api/tasks/${id}`)
    AppState.tasks = AppState.tasks.filter(b => b.id !== id)
  }
}

export const tasksService = new TasksService()