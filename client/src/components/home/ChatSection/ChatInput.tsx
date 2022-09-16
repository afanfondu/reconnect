import { SendIcon } from '@/components/icons/SendIcon'
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'

const ChatInput = () => {
  const [message, setMessage] = useState('')
  const sendMessageHandler = () => {
    console.log(message)
  }

  return (
    <Flex width='full'>
      <InputGroup mx='10' mt='8'>
        <Input
          boxShadow='rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'
          bgColor='white'
          variant='filled'
          bg='primary.faint'
          placeholder='Type a message...'
          borderRadius='3xl'
          px='10'
          height='16'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            bg='primary.faint'
            color='primary.dark'
            borderRadius='full'
            mt='6'
            mr='6'
            size='lg'
            aria-label='Send'
            icon={<SendIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}

export default ChatInput
