import mongoose from 'mongoose'
const Schema = mongoose.Schema

// const Comment = new Schema({
//   body: { type: String, required: true },
//   creatorId: { type: String, required: true }
// }, { timestamps: true, toJSON: { virtuals: true } })

// Comment.virtual('creator', {
//   localField: 'creatorId',
//   ref: 'Account',
//   foreignField: '_id',
//   justOne: true
// })

const Task = new Schema(
  {
    title: { type: String, required: true },
    listId: { type: Object, ref: 'List', required: true },
    creatorId: { type: String, ref: 'Account', required: true }
    // comments: [Comment]
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
