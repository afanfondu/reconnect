import { Box, Flex, Text } from '@chakra-ui/react'

const messages = [
  {
    sender: '123',
    recipient: '321',
    message: 'hello world',
    isMe: true
  },
  {
    sender: '123',
    recipient: '321',
    message: 'bye world',
    isMe: false
  }
]

const ChatBody = () => {
  return (
    <Flex
      display='flex'
      flex='1'
      width='full'
      height='full'
      direction='column'
      overflowY='auto'
      px='10'
    >
      {messages.map((message, index) => (
        <Box
          key={index}
          my='0.5rem'
          bgColor={message.isMe ? 'primary.dark' : 'white'}
          maxWidth='sm'
          px='6'
          py='4'
          color={message.isMe ? 'white' : 'black'}
          borderRadius='3xl'
          alignSelf={message.isMe ? 'flex-end' : 'flex-start'}
          borderBottomRightRadius={message.isMe ? '0px' : '1.5rem'}
          borderBottomLeftRadius={!message.isMe ? '0px' : '1.5rem'}
          boxShadow={'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'}
        >
          <Text display='flex' alignItems='center'>
            {message.message}
          </Text>
        </Box>
      ))}
    </Flex>
  )
}

export default ChatBody
