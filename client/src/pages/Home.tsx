import { Flex, Heading, IconButton, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { useContacts, useSocket, useStore } from '@/hooks/store'
import { Intro, Sidebar } from '@/components/home'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import EVENTS from '@/utils/Events'

export const Home: React.FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48em)')

  const socket = useSocket(state => state.socket)

  const sidebarOpen = useStore(state => state.sidebarOpen)
  const setSidebar = useStore(state => state.setSidebar)
  const selectedContactIdx = useStore(state => state.selectedContactIdx)
  const setSelectedContactIdx = useStore(state => state.setSelectedContactIdx)

  const setContacts = useContacts(state => state.setContacts)

  useEffect(() => {
    if (!socket) return

    socket.on(EVENTS.SERVER.CONTACTS, contacts => {
      console.log('getting contacts from server...', contacts)
      setContacts(contacts)
    })

    socket.emit(EVENTS.CLIENT.SEND_CONTACTS)

    return () => {
      socket.off(EVENTS.SERVER.CONTACTS)
    }
  }, [socket])

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
            ml='4'
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
              <>
                <Heading>Chat Section {selectedContactIdx}</Heading>
              </>
            )}
      </Flex>
    </Flex>
  )
}
