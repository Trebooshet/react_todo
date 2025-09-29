import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { createTodo, deleteTodo, getTodosFromServer, toggleTodo, updateTodo } from '@/api/todos.ts'
import type { FetchTodosResponse, Filter, ToDoItemType } from '@/utils/Types.ts'

export const fetchTodos = createAsyncThunk<FetchTodosResponse, { page: number; limit: number; filter: Filter }>(
  'todos/fetchTodos',
  async ({ page, limit, filter }) => {
    return await getTodosFromServer(page, limit, filter)
  },
)

export const addTodo = createAsyncThunk('todos/addTodo', async (text: string) => {
  return await createTodo(text)
})

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id: number) => {
  await deleteTodo(id)
  return id
})

export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, text }: { id: number; text: string }) => {
  const inputUpperFirst = text.slice(0, 1).toUpperCase() + text.slice(1)
  return await updateTodo(id, inputUpperFirst)
})

export const toggleTodoItem = createAsyncThunk('todos/toggleTodoItem', async (id: number) => {
  return await toggleTodo(id)
})

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as ToDoItemType[],
    isLoading: true,
    page: 1,
    totalPages: 1,
    limit: 5,
    totalItems: 0,
    filter: 'all' as Filter,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
    setLimit: (state, action) => {
      state.limit = action.payload
      state.page = 1
    },
    setFilter: (state, action) => {
      state.filter = action.payload
      state.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = Array.isArray(action.payload.data) ? action.payload.data : []
        state.totalItems = action.payload.total
        state.totalPages = action.payload.totalPages
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.isLoading = false
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
        state.totalItems++
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((i) => i.id !== action.payload)
        state.totalItems--
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
        state.todos[index] = action.payload
      })
      .addCase(toggleTodoItem.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
        state.todos[index] = action.payload
      })
  },
})

export const { setPage, setLimit, setFilter } = todoSlice.actions

export default todoSlice.reducer
