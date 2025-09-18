import { GoMoon, GoSun } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { Box, Button,Heading, HStack, IconButton, useColorMode, VStack } from '@chakra-ui/react'

import Clock from '@/components/ToDoList/Clock.tsx'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  const HomeButtonClickHandler = () => {
    navigate('/')
  }

  const ProfileButtonClickHandler = () => {
    navigate('/profile')
  }

  const LoginButtonClickHandler = () => {
    navigate('/login')
  }

  const RegisterButtonClickHandler = () => {
    navigate('/register')
  }

  return (
    <>
      <VStack position="relative" mt={'-2'}>
        <Box position="absolute" left={5} top={4}>
          <Clock />
        </Box>

        <IconButton
          position="absolute"
          right={5}
          top={5}
          icon={colorMode === 'light' ? <GoMoon /> : <GoSun />}
          rounded="full"
          aria-label="Theme - switcher"
          onClick={toggleColorMode}
        />
        <HStack spacing={2}>
          <Heading
            as="h1"
            fontSize="50px"
            fontWeight="extrabold"
            bgGradient="linear(to-r, orange.700, orange.500, orange.300)"
            bgClip={'text'}
            mb={'1'}
          >
            To Do App
          </Heading>
          <Button onClick={HomeButtonClickHandler}>Home</Button>
          <Button onClick={ProfileButtonClickHandler}>Profile</Button>
          <Button onClick={LoginButtonClickHandler}>Login</Button>
          <Button onClick={RegisterButtonClickHandler}>Registration</Button>
        </HStack>
      </VStack>
    </>
  )
}
