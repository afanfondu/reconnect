import { useAuth } from '@/hooks/store'
import { Button, Heading } from '@chakra-ui/react'
import React from 'react'

export const Home: React.FC = () => {
  const logout = useAuth(state => state.logout)

  return (
    <div>
      <Heading>Home</Heading>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}
