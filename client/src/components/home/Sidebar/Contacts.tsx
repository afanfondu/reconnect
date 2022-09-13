import { useContacts, useStore } from '@/hooks/store'
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Heading,
  Text,
  useMediaQuery
} from '@chakra-ui/react'

const Contacts: React.FC = () => {
  const [mobile] = useMediaQuery('(max-width: 48em)')

  const setSidebar = useStore(state => state.setSidebar)
  const selectedContactIdx = useStore(state => state.selectedContactIdx)
  const setSelectedContactIdx = useStore(state => state.setSelectedContactIdx)

  const contacts = useContacts(state => state.contacts)

  return (
    <Flex
      bg='primary.faint'
      style={{ direction: 'rtl' }}
      overflowY='auto'
      h='full'
      flexDirection='column'
    >
      <Box
        minHeight='20px'
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
          onClick={() => {
            setSelectedContactIdx(idx)
            if (mobile) setSidebar(false)
          }}
        >
          <Avatar
            mx='4'
            name={contact.recipient.name}
            src={contact.recipient.image}
          >
            <AvatarBadge
              boxSize='1.25em'
              bg={
                contact.recipient.status === 'online' ? 'green.500' : 'tomato'
              }
            />
          </Avatar>
          <Flex direction='column'>
            <Heading as='h6' size='sm'>
              {contact.recipient.name}
            </Heading>
            {contact.newMessagesCount !== 0 ? (
              <Text color='gray'>
                {contact.newMessagesCount} new message
                {contact.newMessagesCount > 1 && 's'}
              </Text>
            ) : (
              <Text>{contact.recipient.email}</Text>
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
