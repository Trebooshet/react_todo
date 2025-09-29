import { protectedApi } from '@/api/interceptors.ts'
import type { FetchTodosResponse } from '@/utils/Types.ts'

export async function getTodosFromServer(
  page: number = 1,
  limit: number = 5,
  filter: 'active' | 'completed' | 'all' = 'all',
) {
  const params: string[] = []
  params.push(`page=${page}`)
  params.push(`limit=${limit}`)
  params.push(`filter=${filter}`)

  const joinedParams: string = `?${params.join('&')}`

  const response = await protectedApi.get<FetchTodosResponse>(`/todos${joinedParams}`)
  console.log(response.data)
  return response.data
}

export async function deleteTodo(id: number) {
  const response = await protectedApi.delete(`/todos/${id}`)
  return response.data
}

export const createTodo = async (text: string) => {
  const response = await protectedApi.post(`/todos`, { text })
  return response.data
}

export async function updateTodo(id: number, text: string | null) {
  const response = await protectedApi.put(`/todos/${id}`, { text })
  return response.data
}

export async function toggleTodo(id: number) {
  const response = await protectedApi.patch(`/todos/${id}/toggle`, {})
  return response.data
}
