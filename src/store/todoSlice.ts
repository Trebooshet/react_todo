import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { getTodosFromServer, createTodo, deleteTodo, updateTodo, toggleTodo }from "../api/todos.ts";
import type { ToDoItemType, FetchTodosResponse } from '../utils/Types.ts'

export const fetchTodos = createAsyncThunk<FetchTodosResponse>(
  "todos/fetchTodos",
  async () => {
    return await getTodosFromServer();
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text: string) => {
    return  await createTodo(text);
  }
);

export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id: number) => {
    await deleteTodo(id);
    return id; // вернём id, чтобы потом удалить из state
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, text }: { id: number; text: string | null}) => {
    return  await updateTodo(id, text)
  }
)

export const toggleTodoItem = createAsyncThunk (
  "todos/toggleTodoItem",
  async (id: number) => {
    return await toggleTodo(id)
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as ToDoItemType[],
  },
  reducers: {

  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodos.fulfilled, (state, action) => {
          state.todos = Array.isArray(action.payload.data) ? action.payload.data : [];
        })
        .addCase(addTodo.fulfilled, (state, action) => {
          state.todos.push(action.payload);
        })
        .addCase(removeTodo.fulfilled, (state, action) =>{
          state.todos = state.todos.filter(i => i.id !== action.payload)
        })
        .addCase(editTodo.fulfilled, (state, action) => {
          const index = state.todos.findIndex(todo => todo.id === action.payload.id);
          if (index !== -1) {
            state.todos[index] = action.payload;
          }
        })
        .addCase(toggleTodoItem.fulfilled, (state, action) => {
          const index = state.todos.findIndex(todo => todo.id === action.payload.id);
          if (index !== -1) {
            state.todos[index] = action.payload;
          }
        });
    },
})


export default todoSlice.reducer