import { Flex, Heading, IconButton, useMediaQuery } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import { useSocket, useStore } from '@/hooks/store'
import { Intro, Sidebar } from '@/components/home'
import { ArrowLeftIcon } from '@chakra-ui/icons'

export const Home: React.FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48em)')

  const socket = useSocket(state => state.socket)

  const sidebarOpen = useStore(state => state.sidebarOpen)
  const setSidebar = useStore(state => state.setSidebar)
  const selectedContactIdx = useStore(state => state.selectedContactIdx)
  const setSelectedContactIdx = useStore(state => state.setSelectedContactIdx)

  useEffect(() => {
    if (!socket) return

    socket.on('get-hello', ({ message }: any) => {
      console.log(message)
    })

    socket.emit('send-hello')

    return () => {
      socket.off('get-hello')
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
