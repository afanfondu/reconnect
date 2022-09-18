import { SendIcon } from '@/components/icons/SendIcon'
import {
  Message,
  useAuth,
  useContacts,
  useMessages,
  useSocket,
  useStore
} from '@/hooks/store'
import EVENTS from '@/utils/Events'
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

  const user = useAuth(state => state.user)
  const contacts = useContacts(state => state.contacts)
  const selectedContactIdx = useStore(state => state.selectedContactIdx)
  const socket = useSocket(state => state.socket)

  const newMessagesCount = useMessages(state => state.newMessagesCount)
  const setNewMessagesCount = useMessages(state => state.setNewMessagesCount)

  const sendMessageHandler = (e: any) => {
    e.preventDefault()

    const newMessage: Message = {
      sender: user!._id,
      recipient: contacts[selectedContactIdx!].recipient._id,
      message
    }

    if (socket) socket.emit(EVENTS.CLIENT.SEND_MESSAGE, newMessage)

    setMessage('')
    if (newMessagesCount !== 0) setNewMessagesCount(0)
  }

  return (
    <form style={{ width: '100%' }} onSubmit={sendMessageHandler}>
      <Flex width='full'>
        <InputGroup mx='10' mt='8'>
          <Input
            autoFocus
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
              type='submit'
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </form>
  )
}

export default ChatInput
