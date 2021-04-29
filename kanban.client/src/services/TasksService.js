import { AppState } from '../AppState.js'
// REVIEW router gets imported directly from the router file
import { api } from './AxiosService.js'

class TasksService {
  async getTasks(listId) {
    const res = await api.get(`api/lists/${listId}/tasks`)
    AppState.tasks[listId] = res.data
  }

  async createTask(newTask) {
    const res = await api.post('api/tasks', newTask)
    this.getTasks(res.data.listId)
  }

  async deleteTask(listId, id) {
    await api.delete(`api/tasks/${id}`)
    AppState.tasks[listId] = AppState.tasks[listId].filter(t => t.id !== id)
  }

  async editTask(listId, body) {
    await api.tasks.put(`api/tasks/${liid}, )
  }
}

export const tasksService = new TasksService()
