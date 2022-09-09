import { io, Socket } from 'socket.io-client'
import create from 'zustand'

interface State {
  socket: null | Socket
  setSocket: (userId: string) => void
}

export const useSocket = create<State>()((set, get) => ({
  socket: null,
  setSocket: userId => {
    if (get().socket != null) return

    const socket = io(import.meta.env.VITE_API_URL, {
      auth: { userId }
    })

    set({ socket })
  }
}))
