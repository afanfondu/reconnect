import { useAuth, useSocket } from '@/hooks/store'
import { Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export const Home: React.FC = () => {
  const logout = useAuth(state => state.logout)

  const socket = useSocket(state => state.socket)

  useEffect(() => {
    if(!socket) return

    socket.on('get-hello', ({ message }: any) => {
      console.log(message)
    })

    socket.emit('send-hello')

    return () => {
      socket.off('get-hello')
    }
  }, [socket])

  return (
    <div>
      <Heading>Home</Heading>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}
