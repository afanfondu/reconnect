import { Flex, IconButton, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import {
  useAuth,
  useContacts,
  useMessages,
  useSocket,
  useStore
} from '@/hooks/store'
import { Intro, Sidebar } from '@/components/home'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import EVENTS from '@/utils/Events'
import { ChatSection } from '@/components/home/ChatSection'

export const Home: React.FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48em)')

  const socket = useSocket(state => state.socket)

  const sidebarOpen = useStore(state => state.sidebarOpen)
  const setSidebar = useStore(state => state.setSidebar)
  const selectedContactIdx = useStore(state => state.selectedContactIdx)
  const setSelectedContactIdx = useStore(state => state.setSelectedContactIdx)

  const user = useAuth(state => state.user)

  const contacts = useContacts(state => state.contacts)
  const setContacts = useContacts(state => state.setContacts)

  const addMessage = useMessages(state => state.addMessage)
  const setMessages = useMessages(state => state.setMessages)
  const setUnseenMessagesCount = useMessages(
    state => state.setUnseenMessagesCount
  )

  useEffect(() => {
    if (!socket) return

    socket.on(EVENTS.SERVER.CONTACTS, contacts => {
      setContacts(contacts)
    })

    socket.on(EVENTS.SERVER.CONTACT_MESSAGES, messages => {
      setMessages(messages)
    })

    socket.on(EVENTS.SERVER.UNSEEN_MESSAGES_COUNT, unseenMessagesCount => {
      setUnseenMessagesCount(unseenMessagesCount)
    })

    return () => {
      socket.off(EVENTS.SERVER.CONTACTS)
      socket.off(EVENTS.SERVER.CONTACT_MESSAGES)
      socket.off(EVENTS.SERVER.UNSEEN_MESSAGES_COUNT)
    }
  }, [socket])

  useEffect(() => {
    if (!socket || selectedContactIdx == null) return

    socket.on(EVENTS.SERVER.RECEIVE_MESSAGE, message => {
      if (message.sender === user!._id) {
        addMessage(message)
      }

      if (message.sender === contacts[selectedContactIdx].recipient._id) {
        addMessage(message)

        socket.emit(
          EVENTS.CLIENT.SEEN_MESSAGES,
          contacts[selectedContactIdx]._id
        )
      }
    })

    return () => {
      if (socket) socket.off(EVENTS.SERVER.RECEIVE_MESSAGE)
    }
  }, [socket, selectedContactIdx])

  return (
    <Flex>
      {sidebarOpen && <Sidebar />}

      <Flex
        alignItems='center'
        direction='column'
        py='8'
        h='100vh'
        flex='1'
        bg='primary.faint'
      >
        {mobile && !sidebarOpen && (
          <IconButton
            bg='white'
            alignSelf='start'
            color='primary.dark'
            borderRadius='full'
            boxSize='12'
            mb='4'
            ml='10'
            onClick={() => {
              setSidebar(true)
              setSelectedContactIdx(null)
            }}
            aria-label='Close'
            icon={<ArrowLeftIcon />}
          />
        )}

        {selectedContactIdx === null
          ? !mobile && <Intro />
          : ((mobile && !sidebarOpen) || (!mobile && sidebarOpen)) && (
              <ChatSection />
            )}
      </Flex>
    </Flex>
  )
}
