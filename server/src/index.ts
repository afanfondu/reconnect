import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import http from 'http'

import './utils/connectDB'
import { corsOptions } from './utils/corsOptions'
import authRouter from './routes/auth'
import SocketServer from './socket'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)

new SocketServer(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/api/auth', authRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({ uptime: process.uptime() })
})

server.listen(PORT, () =>
  console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`)
)
