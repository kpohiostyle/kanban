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
    const data = await dbContext.Tasks.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id - Delete')
    }
  }

  async createComment(taskId, body) {
    // const car = await this.findById(id)
    // car.comments.push(body)
    // await car.save()
    // return car
    const updated = await dbContext.Tasks.findOneAndUpdate({ _id: taskId }, { $push: { comments: body } }, { new: true })
    if (!updated) {
      throw new BadRequest('invalid id')
    }
    return updated
  }
}

export const tasksService = new TasksService()
