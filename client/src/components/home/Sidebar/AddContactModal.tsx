import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { useRef } from 'react'

interface Props {
  isOpen: any
  onClose: any
}

const AddContactModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const initialRef = useRef<HTMLInputElement | null>(null)

  const addContact = () => {
    console.log('contact added -', initialRef.current?.value)
    onClose()
  }

  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input ref={initialRef} placeholder="Enter contact's email" />
          </ModalBody>

          <ModalFooter>
            <Button
              type='submit'
              onClick={addContact}
              colorScheme='blue'
              mr={3}
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
