import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    title: { type: String, required: true },
    ListId: { type: Object, ref: 'List', required: true },
    CreatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
