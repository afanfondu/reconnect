import mongoose from 'mongoose'

export interface IContact {
  user: mongoose.Types.ObjectId
  recipient: mongoose.Types.ObjectId
  newMessageDate: Date
  newMessagesCount: number
}

const Contact = mongoose.model<IContact>(
  'Contact',
  new mongoose.Schema<IContact>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      newMessageDate: {
        type: Date,
        default: () => new Date()
      },
      newMessagesCount: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  )
)

export default Contact
