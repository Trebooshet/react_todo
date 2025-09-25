import { useEffect, useState } from 'react'
import { Box, Button, Grid, GridItem, Input, Text, useColorModeValue } from '@chakra-ui/react'

import { validatePassword } from '@/api/auth.ts'
import { changePass, profile } from '@/store/authSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/hooks.ts'
import type { KeyEvent } from '@/utils/Types.ts'

function ProfilePage() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const todos = useAppSelector((state) => state.todos.todos)
  const totalTodos = todos.length
  const completedTodos = todos.filter((i) => i.completed).length
  const [isPasswordChanging, setIsPasswordChanging] = useState<boolean>(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const profileBg = useColorModeValue('blue.100', 'transparent')

  useEffect(() => {
    dispatch(profile()).unwrap()
  }, [dispatch])

  const clearInputs = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleKeyDown = (e: KeyEvent) => {
    if (e.key === 'Enter') {
      void handleChangeButtonClick()
    }
  }

  const handleChangeButtonClick = async () => {
    if (!isPasswordChanging) {
      setIsPasswordChanging(true)
      return
    }
    if (!newPassword || !oldPassword || !confirmPassword) {
      return
    }
    if (newPassword !== confirmPassword) {
      clearInputs()
      alert('Новые пароли не совпадают!')
    }

    if (newPassword === confirmPassword) {
      try {
        validatePassword(newPassword)
        await dispatch(changePass({ oldPassword, newPassword })).unwrap()
        clearInputs()
        setIsPasswordChanging(false)
        alert('Пароль успешно изменён!')
      } catch (e) {
        clearInputs()
        if (e instanceof Error) {
          alert('Ошибка при смене пароля. ' + e.message)
        }
      }
    }
  }

  return (
    <>
      {user && (
        <Box w={'60%'} mx={'auto'} display={'flex'} flexDirection={'column'} justifyContent={'center'} mt={10}>
          <Box bg={profileBg} borderRadius={'15px'} py={'5'}>
            <Text fontSize={'2xl'} mb={'2'} display={'flex'} justifyContent={'center'} color="orange.500">
              Ваш Профиль
            </Text>
            <Grid templateColumns="1fr 1fr" gridColumnGap={5} alignItems="center">
              <GridItem textAlign="right" fontSize={'2xl'}>
                <Text fontWeight="bold">ID:</Text>
              </GridItem>

              <GridItem fontSize={'2xl'}>
                <Text>{user.id}</Text>
              </GridItem>

              <GridItem textAlign="right" fontSize={'2xl'}>
                <Text fontWeight="bold">Email:</Text>
              </GridItem>

              <GridItem fontSize={'2xl'}>
                <Text>{user.email}</Text>
              </GridItem>

              {user.age && (
                <>
                  <GridItem textAlign="right" fontSize={'2xl'}>
                    <Text fontWeight="bold">Возраст:</Text>
                  </GridItem>

                  <GridItem fontSize={'2xl'}>
                    <Text>{user.age}</Text>
                  </GridItem>
                </>
              )}

              <GridItem textAlign="right" fontSize={'2xl'}>
                <Text fontWeight="bold">Создан:</Text>
              </GridItem>

              <GridItem fontSize={'2xl'}>
                <Text>{new Date(user.createdAt!).toLocaleString()}</Text>
              </GridItem>

              <GridItem textAlign="right" fontSize={'2xl'}>
                <Text fontWeight="bold">Количество дел:</Text>
              </GridItem>

              <GridItem fontSize={'2xl'}>
                <Text>{totalTodos}</Text>
              </GridItem>

              <GridItem textAlign="right" fontSize={'2xl'}>
                <Text fontWeight="bold">Завершённых дел:</Text>
              </GridItem>

              <GridItem fontSize={'2xl'}>
                <Text>{completedTodos}</Text>
              </GridItem>

              <GridItem textAlign="right" fontSize={'2xl'}>
                <Text fontWeight="bold">Незавершённых дел:</Text>
              </GridItem>

              <GridItem fontSize={'2xl'}>
                <Text>{totalTodos - completedTodos}</Text>
              </GridItem>
            </Grid>
          </Box>
          {isPasswordChanging && (
            <>
              <Input
                mt={'4'}
                w={'60%'}
                mx={'auto'}
                placeholder={'Old password'}
                value={oldPassword}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setOldPassword(e.target.value)
                }}
              ></Input>
              <Input
                mt={'2'}
                w={'60%'}
                mx={'auto'}
                placeholder={'New password'}
                value={newPassword}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
              ></Input>
              <Input
                mt={'2'}
                w={'60%'}
                mx={'auto'}
                placeholder={'Confirm new password'}
                value={confirmPassword}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              ></Input>
            </>
          )}
          <Button mt={6} mx={'auto'} minW={'20%'} onClick={handleChangeButtonClick}>
            Change password
          </Button>
        </Box>
      )}
    </>
  )
}

export default ProfilePage
