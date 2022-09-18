import create from 'zustand'

export interface Message {
  sender: string
  recipient: string
  message: string
  createdAt?: Date
}

interface State {
  messages: Message[]
  newMessagesCount: number
  unseenMessagesCount: number
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  setNewMessagesCount: (count: number) => void
  setUnseenMessagesCount: (count: number) => void
}

export const useMessages = create<State>()((set, get) => ({
  messages: [],
  newMessagesCount: 0,
  unseenMessagesCount: 0,
  setMessages: (messages: Message[]) => {
    set({ messages })
  },
  addMessage: (message: Message) => {
    set({ messages: [...get().messages, message] })
  },

  setNewMessagesCount: (count: number) => {
    set({ newMessagesCount: count })
  },

  setUnseenMessagesCount: (count: number) => {
    set({ unseenMessagesCount: count })
  }
}))
