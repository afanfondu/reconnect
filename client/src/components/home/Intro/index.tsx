import { Connect } from '@/components/icons'
import { LockIcon } from '@chakra-ui/icons'
import { Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export const Intro: React.FC = () => {
  return (
    <>
      <Connect />
      <Heading>reconnect</Heading>
      <Text>connect with your family, friends or co-workers.</Text>

      <Divider my='4' />

      <Flex alignItems='center'>
        <LockIcon color='gray' />
        <Text ml='2' color='gray'>
          End-to-end encrypted
        </Text>
      </Flex>
    </>
  )
}
