const EVENTS = {
  CLIENT: {
    ADD_NEW_CONTACT: 'add-new-contact',
    SEND_MESSAGE: 'send-message',
    SEND_CONTACT_MESSAGES: 'send-contact-messages',
    SEEN_MESSAGES: 'seen-messages'
  },
  SERVER: {
    CONTACTS: 'contacts',
    CONTACT_MESSAGES: 'contact-messages',
    RECEIVE_MESSAGE: 'receive-message',
    UNSEEN_MESSAGES_COUNT: 'unseen-messages-count'
  }
}

export default EVENTS
