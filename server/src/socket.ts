import { Server, Socket } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { allowedOrigins } from './utils/corsOptions'
import Contact from './models/Contact'
import User from './models/User'
import updateUserStatus from './utils/updateUserStatus'
import sendContacts from './utils/sendContacts'

export const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CLIENT: {
    ADD_NEW_CONTACT: 'add-new-contact',
    SEND_CONTACTS: 'send-contacts'
  },
  SERVER: {
    CONTACTS: 'contacts'
  }
}

const handleSocketServer = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins
    }
  })

  io.on(EVENTS.CONNECTION, socket => {
    const userId = socket.handshake.auth.userId
    socket.join(userId)
    updateUserStatus(userId, 'online', io)
    console.log(userId, 'is online')

    socket.on(EVENTS.CLIENT.SEND_CONTACTS, async () => {
      sendContacts(userId, io)
    })

    socket.on(
      EVENTS.CLIENT.ADD_NEW_CONTACT,
      async (recipientEmail: string, cb: Function) => {
        const recipient = await User.findOne({ email: recipientEmail })

        if (!recipient)
          return cb(`User with email '${recipientEmail}' doesn't exists.`)

        const contact = await Contact.findOne({
          user: userId,
          recipient: recipient._id
        })

        if (contact) return cb('This email is already in your contact.')
        if (userId === `${recipient._id}`) return cb('Something went wrong!')

        await Contact.create({
          user: userId,
          recipient: recipient._id
        })

        sendContacts(userId, io)
      }
    )

    socket.on(EVENTS.DISCONNECT, () => {
      updateUserStatus(userId, 'offline', io)
      console.log(userId, 'is offline')
    })
  })
}

export default handleSocketServer
