// import axios from 'axios'
// const url = 'http://localhost:3001'
import { authApi, protectedApi } from '@/api/refreshInterceptor.ts'
import { deleteCookie, setCookie } from '@/utils/cookie'

export const register = async (email: string, password: string, age?: number) => {
  deleteCookie('refreshToken')
  const { accessToken, refreshToken } = (
    await authApi.post(`/auth/register`, {
      email,
      password,
      ...(age !== undefined ? { age } : {}),
    })
  ).data
  setCookie('refreshToken', refreshToken)
  console.log(accessToken, refreshToken)
  return { accessToken, refreshToken }
}

export const login = async (email: string, password: string) => {
  deleteCookie('refreshToken')
  const { accessToken, refreshToken } = (
    await authApi.post(`/auth/login`, {
      email: email,
      password: password,
    })
  ).data
  setCookie('refreshToken', refreshToken)
  console.log({ accessToken, refreshToken })
  return { accessToken, refreshToken }
}

export const me = async (token: string | null) => {
  const resp = await protectedApi.get(`/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  console.log(resp.data)
  return resp.data
}

export const changePassword = async (oldPass: string, newPass: string, token: string | null) => {
  const resp = await protectedApi.post(
    `/auth/change-password`,
    {
      oldPassword: oldPass,
      newPassword: newPass,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
  console.log(resp.data)
  return resp.data
}

export const validatePassword = (password: string) => {
  if (!password) {
    throw new Error('Необходимо придумать пароль')
  }
  if (password.length < 6) {
    throw new Error('Пароль должен быть не менее 6 символов')
  }
  return password
}

export const validateEmail = (email: string) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  if (!email) {
    throw new Error('Заполните поле Email')
  }
  if (!regex.test(email)) {
    throw new Error('Некорректный Email')
  }
  if (email.length > 254) {
    throw new Error('Максимальная длина Email не должна превышать 254 символа')
  }
  if (email.indexOf('@') > 63) {
    throw new Error('Максимальная длина локальной части не должна превышать 63 символа')
  }
  return email
}
