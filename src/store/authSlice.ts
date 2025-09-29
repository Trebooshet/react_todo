import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { changePassword, login, me, register } from '@/api/auth'
import { deleteCookie } from '@/utils/cookie.ts'
import type { AuthState } from '@/utils/Types.ts'

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, age }: { email: string; password: string; age?: number }, { rejectWithValue }) => {
    try {
      return await register(email, password, age)
    } catch (e) {
      console.log(e)
      return rejectWithValue('Ошибка регистрации')
    }
  },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    if (!email || !password) {
      return rejectWithValue('Заполните поля логин и пароль')
    }
    try {
      return await login(email, password)
    } catch (e) {
      console.log(e)
      return rejectWithValue('Неверные логин и пароль. Попробуйте еще раз.')
    }
  },
)

export const profile = createAsyncThunk('auth/profile', async () => {
  return await me()
})

export const changePass = createAsyncThunk(
  'auth/changePass',
  async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
    return changePassword(oldPassword, newPassword)
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null
      state.user = null
      state.isLoggedIn = false
      deleteCookie('refreshToken')
    },
    setToken: (state, action) => {
      state.token = action.payload
      state.isLoggedIn = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.user = action.payload
        console.log('user', action.payload)
      })
  },
})

export const { logoutUser, setToken } = authSlice.actions

export default authSlice.reducer
