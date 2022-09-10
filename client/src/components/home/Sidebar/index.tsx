import {
  Avatar,
  HStack,
  Flex,
  Text,
  Box,
  IconButton,
  Input,
  InputRightElement,
  InputGroup,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon, Search2Icon } from '@chakra-ui/icons'

import { useAuth } from '@/hooks/store'
import { LogoutIcon } from '@/components/icons'
import AddContactModal from './AddContactModal'
import Contacts from './Contacts'

export const Sidebar: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const logout = useAuth(state => state.logout)

  return (
    <>
      <Flex
        direction='column'
        height='100vh'
        width={{ base: 'full', md: 'xs' }}
      >
        <Text px='4' pt='4' fontSize='2xl'>
          reconnect
        </Text>

        <HStack px='4' w='full' my='4' justify='space-between'>
          <Avatar name='Itachi Uchiha' src='https://bit.ly/dan-abramov' />

          <Box>
            <Tooltip hasArrow label='Add Contact'>
              <IconButton
                bg='primary.faint'
                color='primary.dark'
                borderRadius='full'
                boxSize='12'
                mr='2'
                size='sm'
                aria-label='Add Contact'
                icon={<AddIcon />}
                onClick={onOpen}
              />
            </Tooltip>
            <AddContactModal onClose={onClose} isOpen={isOpen} />

            <Tooltip hasArrow label='Logout'>
              <IconButton
                bg='primary.faint'
                color='primary.dark'
                borderRadius='full'
                boxSize='12'
                mr='2'
                onClick={() => logout()}
                aria-label='Logout'
                icon={<LogoutIcon />}
              />
            </Tooltip>
          </Box>
        </HStack>

        <InputGroup p='4'>
          <Input
            variant='filled'
            bg='primary.faint'
            placeholder='Search Here'
            borderRadius='full'
            size='sm'
            height='12'
          />
          <InputRightElement>
            <IconButton
              variant='link'
              color='primary.dark'
              aria-label='Search'
              mb='-10'
              ml='-10'
              icon={<Search2Icon />}
            />
          </InputRightElement>
        </InputGroup>

        <Contacts />
      </Flex>
    </>
  )
}
