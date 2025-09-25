import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { changePassword, login, me, register } from '@/api/auth'
import { deleteCookie } from '@/utils/cookie.ts'
import type { AuthState } from '@/utils/Types.ts'

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
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
    try {
      return await login(email, password)
    } catch (e) {
      console.log(e)
      return rejectWithValue('Неверные логин и пароль. Попробуйте еще раз.')
    }
  },
)

export const profile = createAsyncThunk('auth/profile', async (_, { getState }) => {
  const state = getState() as { auth: AuthState }
  const token = state.auth.token
  return await me(token)
})

export const changePass = createAsyncThunk(
  'auth/changePass',
  async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }, { getState }) => {
    const state = getState() as { auth: AuthState }
    const token = state.auth.token
    return changePassword(oldPassword, newPassword, token)
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null
      state.user = null
      state.status = 'idle'
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
        console.log('Аксесс токен зарегистрированного юзера', action.payload.accessToken)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLoggedIn = true
        console.log('Аксесс токен залогиненого юзера', action.payload.accessToken)
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.user = action.payload
        console.log('user', action.payload)
      })
  },
})

export const { logoutUser, setToken } = authSlice.actions

export default authSlice.reducer
