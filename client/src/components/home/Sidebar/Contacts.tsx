import { useContacts, useMessages, useSocket, useStore } from '@/hooks/store'
import EVENTS from '@/utils/Events'
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Heading,
  Text,
  Tooltip,
  useMediaQuery
} from '@chakra-ui/react'

const Contacts: React.FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48em)')

  const setSidebar = useStore(state => state.setSidebar)
  const selectedContactIdx = useStore(state => state.selectedContactIdx)
  const setSelectedContactIdx = useStore(state => state.setSelectedContactIdx)

  const contacts = useContacts(state => state.contacts)

  const socket = useSocket(state => state.socket)

  const setNewMessagesCount = useMessages(state => state.setNewMessagesCount)

  const onContactChange = (idx: number) => {
    setSelectedContactIdx(idx)
    setNewMessagesCount(contacts[idx].newMessagesCount)
    if (!socket) return

    socket.emit(
      EVENTS.CLIENT.SEND_CONTACT_MESSAGES,
      contacts[idx].recipient._id
    )

    socket.emit(EVENTS.CLIENT.SEEN_MESSAGES, contacts[idx]._id)

    if (mobile) setSidebar(false)
  }

  return (
    <Flex
      bg='primary.faint'
      style={{ direction: 'rtl' }}
      overflowY='auto'
      h='full'
      flexDirection='column'
    >
      <Box
        minHeight='40px'
        bg='white'
        borderBottomRightRadius={selectedContactIdx === 0 ? '40px' : '0'}
      ></Box>

      {contacts.map((contact, idx) => (
        <Flex
          key={idx}
          style={{ direction: 'ltr' }}
          py='4'
          borderLeftWidth='5px'
          borderLeftStyle='solid'
          cursor='pointer'
          borderLeftColor={
            idx === selectedContactIdx ? 'primary.dark' : 'white'
          }
          bg={idx === selectedContactIdx ? 'primary.faint' : 'white'}
          borderBottomRightRadius={
            selectedContactIdx != null && idx === selectedContactIdx - 1
              ? '40px'
              : '0'
          }
          borderTopRightRadius={
            selectedContactIdx != null && idx === selectedContactIdx + 1
              ? '40px'
              : '0'
          }
          onClick={() => onContactChange(idx)}
        >
          <Tooltip hasArrow label={contact.recipient.email}>
            <Avatar
              mx='4'
              name={contact.recipient.name}
              src={contact.recipient.image}
            >
              {contact.recipient.status === 'online' && (
                <AvatarBadge
                  boxSize='1em'
                  bg='green.500'
                  borderColor='green.100'
                />
              )}
            </Avatar>
          </Tooltip>
          <Flex direction='column'>
            <Heading as='h6' size='sm'>
              {contact.recipient.name}
            </Heading>
            {contact.newMessagesCount !== 0 ? (
              <Text opacity='0.5'>
                {contact.newMessagesCount > 1
                  ? `${contact.newMessagesCount} new messages`
                  : `${contact.newMessagesCount} new message`}
              </Text>
            ) : (
              <Text opacity='0.5'>{contact.recipient.email}</Text>
            )}
          </Flex>
        </Flex>
      ))}

      <Box
        bg='white'
        minHeight='20px'
        flex='1'
        borderTopRightRadius={
          selectedContactIdx === contacts.length - 1 ? '40px' : '0'
        }
      ></Box>
    </Flex>
  )
}

export default Contacts
