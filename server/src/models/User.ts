import mongoose from 'mongoose'

interface IUser {
  name: string
  email: string
  image: string
  status: string
}

const User = mongoose.model<IUser>(
  'User',
  new mongoose.Schema<IUser>(
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      image: {
        type: String,
        required: true
      },
      status: {
        type: String,
        default: 'online'
      }
    },
    { timestamps: true }
  )
)

export default User
