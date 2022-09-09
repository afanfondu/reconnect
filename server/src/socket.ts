import { Server, Socket } from 'socket.io'
import { Server as HTTPServer } from 'http'
import { allowedOrigins } from './utils/corsOptions'

export default class SocketServer {
  io: Server

  constructor(httpServer: HTTPServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: allowedOrigins
      }
    })

    this.io.on('connection', this.handleSocket)
  }

  handleSocket(socket: Socket) {
    console.log('socket connected.', socket.handshake.auth.userId)

    socket.on('send-hello', () => {
      socket.emit('get-hello', { message: 'hello' })
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected.')
    })
  }
}
