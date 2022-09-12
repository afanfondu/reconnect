import User from '../models/User'
import Contact from '../models/Contact'
import sendContacts from './sendContacts'
import { Server } from 'socket.io'

export default async function updateUserStatus(
  userId: string,
  status: string,
  io: Server
) {
  const user = await User.findById(userId)
  if (!user) return

  user.status = status
  await user.save()

  const contactsToUpdate = await Contact.find({ recipient: userId })

  for (let i = 0; i < contactsToUpdate.length; i++) {
    sendContacts(`${contactsToUpdate[i].user}`, io)
  }
}
