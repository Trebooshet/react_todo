import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Text, VStack } from '@chakra-ui/react'

import { loginUser } from '@/store/authSlice.ts'
import { useAppDispatch } from '@/utils/hooks.ts'
import type { KeyEvent } from '@/utils/Types.ts'

function LoginForm() {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap()
      navigate('/')
    } catch (error) {
      clearInputs()
      alert(error)
    }
  }

  const handleEnterButton = (e: KeyEvent) => {
    if (e.key === 'Enter') {
      void handleLogin()
    }
  }

  return (
    <form>
      <VStack mt={'14'}>
        <Text my={'8'} fontSize={'34'}>
          Please log in to enter
        </Text>
        <Input
          my={'1'}
          w={'50%'}
          value={email}
          placeholder={'Email'}
          onKeyDown={handleEnterButton}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        ></Input>
        <Input
          my={'1'}
          w={'50%'}
          value={password}
          placeholder={'Password'}
          onKeyDown={handleEnterButton}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        ></Input>
        <Button onClick={handleLogin}>Login</Button>
        <Text mt={'14'} fontSize={'34'}>
          If you don't have it - <Button onClick={() => navigate('/register')}>Register</Button>
        </Text>
      </VStack>
    </form>
  )
}
export default LoginForm
