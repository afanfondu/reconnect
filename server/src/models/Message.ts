import mongoose from "mongoose";

interface IMessage {
  sender: mongoose.Types.ObjectId
  recipient: mongoose.Types.ObjectId
  message: string
}

const Message = mongoose.model<IMessage>(
  'Message',
  new mongoose.Schema<IMessage>({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
  }, { timestamps: true })
)

export default Message
