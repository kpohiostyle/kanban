import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getTasks(query) {
    return await dbContext.Tasks.find(query)
  }

  async createTask(body) {
    return await dbContext.Tasks.create(body)
  }

  async deleteTask(id) {
    const data = await dbContext.Tasks.findByIdAndDelete({ id: id })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }
}

export const tasksService = new TasksService()
