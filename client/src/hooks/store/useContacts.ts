import EVENTS from '@/utils/Events'
import { Socket } from 'socket.io-client'
import create from 'zustand'
import { User } from './useAuth'

interface Contact {
  user: string
  recipient: User
  newMessageDate: Date
  newMessagesCount: number
}

interface State {
  contacts: Contact[]
  setContacts: (contacts: Contact[]) => void
  addContact: (
    recipientEmail: string,
    socket: Socket | null,
    toast: any,
    onClose: any
  ) => void
}

export const useContacts = create<State>()(set => ({
  contacts: [],

  setContacts: (contacts: Contact[]) => {
    set({ contacts })
  },
  addContact: (
    recipientEmail: string,
    socket: Socket | null,
    toast: any,
    onClose: any
  ) => {
    if (!socket) return

    socket.emit(
      EVENTS.CLIENT.ADD_NEW_CONTACT,
      recipientEmail,
      (errorMessage: string) => {
        toast({
          description: errorMessage,
          status: 'error',
          position: 'bottom-right',
          isClosable: true
        })
      }
    )

    onClose()
  }
}))
