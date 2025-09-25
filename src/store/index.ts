import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/store/authSlice.ts'
import todoReducer from '@/store/todoSlice.ts'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
