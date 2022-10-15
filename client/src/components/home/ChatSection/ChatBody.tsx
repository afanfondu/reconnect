import { CheckIcon } from '@chakra-ui/icons'
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react'
import { Fragment, useEffect, useRef } from 'react'

import { DoubleCheckIcon } from '@/components/icons'
import { useAuth, useMessages } from '@/hooks/store'

const ChatBody = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null)
  const newMessagesRef = useRef<HTMLDivElement | null>(null)

  const messages = useMessages(state => state.messages)
  const newMessagesCount = useMessages(state => state.newMessagesCount)
  const unseenMessagesCount = useMessages(state => state.unseenMessagesCount)

  const user = useAuth(state => state.user)

  useEffect(() => {
    if (newMessagesCount !== 0 && newMessagesRef.current) {
      newMessagesRef.current.scrollIntoView({ behavior: 'auto' })
    } else if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [messages, newMessagesCount])

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
      {messages.map((message, idx) => (
        <Fragment key={idx}>
          {newMessagesCount !== 0 &&
            messages.length - newMessagesCount === idx && (
              <Box
                display='flex'
                py='8'
                alignItems='center'
                justifyContent='center'
                ref={newMessagesRef}
              >
                <Box
                  height='0.3'
                  opacity='0.3'
                  bgColor='gray'
                  width='full'
                ></Box>
                <Text mx='6' minWidth='fit-content' color='primary.dark'>
                  NEW MESSAGES
                </Text>
                <Box
                  height='0.3'
                  opacity='0.3'
                  bgColor='gray'
                  width='full'
                ></Box>
              </Box>
            )}

          <Box
            key={idx}
            my='0.5rem'
            bgColor={message.sender === user!._id ? 'primary.dark' : 'white'}
            maxWidth='sm'
            px='6'
            py='4'
            color={message.sender === user!._id ? 'white' : 'black'}
            borderRadius='3xl'
            alignSelf={message.sender === user!._id ? 'flex-end' : 'flex-start'}
            borderBottomRightRadius={
              message.sender === user!._id ? '0px' : '1.5rem'
            }
            borderBottomLeftRadius={
              message.sender !== user!._id ? '0px' : '1.5rem'
            }
            boxShadow={'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px'}
          >
            <Text
              display='flex'
              alignItems='center'
              justifyContent={
                message.sender === user!._id ? 'flex-end' : 'flex-start'
              }
            >
              {message.message}
            </Text>
            <Box
              display='Flex'
              justifyContent={
                message.sender === user!._id ? 'flex-end' : 'flex-start'
              }
            >
              <>
                <Tooltip
                  hasArrow
                  label={new Date(message.createdAt!).toLocaleString()}
                >
                  <Text fontSize='xs' opacity='0.5'>
                    {new Date(message.createdAt!).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </Tooltip>
                {message.sender === user!._id &&
                messages.length - idx <= unseenMessagesCount ? (
                  <CheckIcon opacity='0.5' ml='2' />
                ) : (
                  <DoubleCheckIcon opacity='0.5' ml='2' />
                )}
              </>
            </Box>
          </Box>
        </Fragment>
      ))}
      <div ref={lastMessageRef}></div>
    </Flex>
  )
}

export default ChatBody
