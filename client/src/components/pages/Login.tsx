import { useAuth } from '@/hooks/store'
import { Box, Flex, Heading, useToast } from '@chakra-ui/react'
import { GoogleLogin } from '@react-oauth/google'

export const Login = () => {
  const setAuth = useAuth(state => state.setAuth)
  const toast = useToast()

  return (
    <Flex
      h='100vh'
      alignItems='center'
      justifyContent='center'
      direction='column'
      bg='primary.faint'
    >
      <Heading mb='4'>Login to continue</Heading>
      <Box mt='4'>
        <GoogleLogin
          onSuccess={res => setAuth(res.credential as string, toast)}
          onError={() => console.log('something went wrong')}
          useOneTap
        />
      </Box>
    </Flex>
  )
}
