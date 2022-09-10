import { useStore } from '@/hooks/store'
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

      {[0, 1, 2, 3, 4].map((item, idx) => (
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
            selectedContactIdx != null && idx === selectedContactIdx - 1 ? '40px' : '0'
          }
          borderTopRightRadius={selectedContactIdx != null && idx === selectedContactIdx + 1 ? '40px' : '0'}
          onClick={() => {
            setSelectedContactIdx(idx)
            if (mobile) setSidebar(false)
          }}
        >
          <Avatar mx='4' name='Itachi Uchiha' src='https://bit.ly/dan-abramov'>
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>
          <Flex direction='column'>
            <Heading as='h6' size='sm'>
              Itachi Uchiha
            </Heading>
            <Text color='gray'>3 new messages</Text>
          </Flex>
        </Flex>
      ))}

      <Box
        bg='white'
        minHeight='20px'
        flex='1'
        borderTopRightRadius={selectedContactIdx === 4 ? '40px' : '0'}
      ></Box>
    </Flex>
  )
}

export default Contacts
