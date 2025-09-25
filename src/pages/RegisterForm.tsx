import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Text, VStack } from '@chakra-ui/react'

import { validateEmail, validatePassword } from '@/api/auth.ts'
import { registerUser } from '@/store/authSlice.ts'
import { useAppDispatch } from '@/utils/hooks.ts'
import type { KeyEvent } from '@/utils/Types.ts'

function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const clearInputs = () => {
    setEmail('')
    setPassword('')
    setAge('')
  }

  const handleRegister = async () => {
    try {
      validateEmail(email)
      validatePassword(password)
      await dispatch(registerUser({ email, password, age: age.trim() ? Number(age) : undefined })).unwrap()
      clearInputs()
      alert('Вы успешно зарегистрированы')
      navigate('/')
    } catch (e) {
      alert(e)
    }
  }

  const handleKeyDown = (e: KeyEvent) => {
    if (e.key === 'Enter') {
      void handleRegister()
    }
  }

  return (
    <VStack mt={'14'}>
      <Text my={'8'} fontSize={'34'}>
        {' '}
        Enter your email and password to register
      </Text>
      <Input
        my={'1'}
        w={'50%'}
        value={email}
        placeholder={'Email'}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      ></Input>
      <Input
        my={'1'}
        w={'50%'}
        value={password}
        placeholder={'Password'}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      ></Input>
      <Input
        my={'1'}
        w={'50%'}
        value={age}
        placeholder={'Age (Не обязательно)'}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setAge(e.target.value)
        }}
      ></Input>
      <Button onClick={handleRegister}>Register</Button>
    </VStack>
  )
}

export default RegisterForm
