import { Server } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { allowedOrigins } from './utils/corsOptions'
import Contact from './models/Contact'
import User from './models/User'
import updateUserStatus from './utils/updateUserStatus'
import sendContacts from './utils/sendContacts'
import Message from './models/Message'

export const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CLIENT: {
    ADD_NEW_CONTACT: 'add-new-contact',
    SEND_MESSAGE: 'send-message',
    SEND_CONTACT_MESSAGES: 'send-contact-messages',
    SEEN_MESSAGES: 'seen-messages'
  },
  SERVER: {
    CONTACTS: 'contacts',
    CONTACT_MESSAGES: 'contact-messages',
    RECEIVE_MESSAGE: 'receive-message',
    UNSEEN_MESSAGES_COUNT: 'unseen-messages-count'
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
    sendContacts(userId, io)
    console.log(userId, 'is online')

    socket.on(
      EVENTS.CLIENT.ADD_NEW_CONTACT,
      async (recipientEmail: string, cb: Function) => {
        const recipient = await User.findOne({ email: recipientEmail })

        if (!recipient)
          return cb(
            `User with email '${recipientEmail}' doesn't exists. Tell him/her to register first.`
          )

        const contact = await Contact.findOne({
          user: userId,
          recipient: recipient._id
        })

        if (contact) return cb('This email is already in your contact list.')
        if (userId === `${recipient._id}`)
          return cb('Why you want to add yourself in your contact list 😅.')

        await Contact.create({
          user: userId,
          recipient: recipient._id
        })

        sendContacts(userId, io)
      }
    )

    socket.on(
      EVENTS.CLIENT.SEND_CONTACT_MESSAGES,
      async (recipient: string) => {
        const messages = await Message.find().or([
          {
            $and: [{ sender: userId }, { recipient }]
          },
          {
            $and: [{ sender: recipient }, { recipient: userId }]
          }
        ])

        const recipientContact = await Contact.findOne({
          user: recipient,
          recipient: userId
        })

        const unseenMessagesCount = recipientContact
          ? recipientContact.newMessagesCount
          : 0

        socket.emit(EVENTS.SERVER.CONTACT_MESSAGES, messages)
        socket.emit(EVENTS.SERVER.UNSEEN_MESSAGES_COUNT, unseenMessagesCount)
      }
    )

    socket.on(EVENTS.CLIENT.SEND_MESSAGE, async (message: any) => {
      const newMessage = await Message.create(message)

      const contact = await Contact.findOne({
        user: message.recipient,
        recipient: userId
      })

      if (!contact) {
        await Contact.create({
          user: message.recipient,
          recipient: userId,
          newMessagesCount: 1
        })
      } else {
        contact.newMessagesCount = contact.newMessagesCount + 1
        await contact.save()
      }

      sendContacts(message.recipient, io)

      const unseenMessagesCount = contact ? contact.newMessagesCount : 1

      socket.emit(EVENTS.SERVER.UNSEEN_MESSAGES_COUNT, unseenMessagesCount)

      io.to([message.recipient, userId]).emit(
        EVENTS.SERVER.RECEIVE_MESSAGE,
        newMessage
      )
    })

    socket.on(EVENTS.CLIENT.SEEN_MESSAGES, async (contactIdx: string) => {
      const contact = await Contact.findById(contactIdx)
      contact!.newMessagesCount = 0
      await contact!.save()
      sendContacts(userId, io)

      io.to(`${contact!.recipient}`).emit(
        EVENTS.SERVER.UNSEEN_MESSAGES_COUNT,
        0
      )
    })

    socket.on(EVENTS.DISCONNECT, () => {
      updateUserStatus(userId, 'offline', io)
      console.log(userId, 'is offline')
    })
  })
}

export default handleSocketServer
