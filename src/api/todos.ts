// import api from '@/api/refreshInterceptor.ts'
// import axios from 'axios'
import { protectedApi } from '@/api/refreshInterceptor.ts'
import type { FetchTodosResponse } from '@/utils/Types.ts'

// const axiosUrl: string = 'http://localhost:3001'

export async function getTodosFromServer(
  page: number = 1,
  limit: number = 5,
  filter: 'active' | 'completed' | 'all' = 'all',
  token: string | null,
) {
  // let url = `${axiosUrl}/todos`

  const params: string[] = []
  params.push(`page=${page}`)
  params.push(`limit=${limit}`)
  params.push(`filter=${filter}`)

  const joinedParams: string = `?${params.join('&')}`

  const response = await protectedApi.get<FetchTodosResponse>(`/todos${joinedParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.data)
  return response.data
}

export async function deleteTodo(id: number, token: string | null) {
  const response = await protectedApi.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const createTodo = async (text: string, token: string | null) => {
  console.log('Токен при вызове createTodo:', token)
  const response = await protectedApi.post(
    `/todos`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export async function updateTodo(id: number, text: string | null, token: string | null) {
  const response = await protectedApi.put(
    `/todos/${id}`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export async function toggleTodo(id: number, token: string | null) {
  const response = await protectedApi.patch(
    `/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}
