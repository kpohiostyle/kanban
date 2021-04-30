import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getTasks(query) {
    return await dbContext.Tasks.find(query)
  }

  async createTask(body) {
    return await dbContext.Tasks.create(body)
  }

  async deleteTask(id, userId) {
    const data = await dbContext.Tasks.findOneAndDelete({ _id: id, creatorId: userId })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }

  async editTask(body) {
    await dbContext.Tasks.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body)
  }
}

export const tasksService = new TasksService()
