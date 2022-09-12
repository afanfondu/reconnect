import { Server } from 'socket.io'
import Contact from '../models/Contact'
import { EVENTS } from '../socket'

export default async function sendContacts(userId: string, io: Server) {
  const contacts = await Contact.find({ user: userId })
    .sort('newMessageDate')
    .populate('recipient')

  io.to(userId).emit(EVENTS.SERVER.CONTACTS, contacts)
}
