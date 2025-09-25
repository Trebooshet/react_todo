import { GoMoon, GoSun } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Heading, HStack, IconButton, useBreakpointValue, useColorMode, VStack } from '@chakra-ui/react'

import Clock from '@/components/Clock.tsx'
import { logoutUser } from '@/store/authSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/hooks.ts'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const mediumScreen = useBreakpointValue({ base: false, md: true })

  const homeButtonClickHandler = () => {
    navigate('/')
  }

  const profileButtonClickHandler = () => {
    navigate('/profile')
  }

  const loginButtonClickHandler = () => {
    navigate('/login')
  }

  const logOut = () => {
    dispatch(logoutUser())
    navigate('/login')
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
          top={4}
          icon={colorMode === 'light' ? <GoMoon /> : <GoSun />}
          rounded="full"
          aria-label="Theme - switcher"
          onClick={toggleColorMode}
        />
        <HStack spacing={2} minH={16}>
          {mediumScreen && (
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
          )}

          <Button onClick={homeButtonClickHandler}>Todos</Button>
          <Button onClick={profileButtonClickHandler}>Profile</Button>
          {isLoggedIn ? (
            <Button onClick={logOut}>LogOut</Button>
          ) : (
            <Button onClick={loginButtonClickHandler}>Login</Button>
          )}
        </HStack>
      </VStack>
    </>
  )
}
