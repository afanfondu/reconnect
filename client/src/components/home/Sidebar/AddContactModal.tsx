import { useContacts, useSocket } from '@/hooks/store'
import EVENTS from '@/utils/Events'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

interface Props {
  isOpen: any
  onClose: any
}

const AddContactModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const initialRef = useRef<HTMLInputElement | null>(null)

  const [email, setEmail] = useState('')

  const socket = useSocket(state => state.socket)
  const toast = useToast()

  const addContact = useContacts(state => state.addContact)

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              ref={initialRef}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter contact's email"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => addContact(email, socket, toast, onClose)}
              colorScheme='blue'
              mr={3}
              disabled={email === ''}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddContactModal
