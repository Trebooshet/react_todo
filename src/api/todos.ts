import axios from 'axios';
import type { FetchTodosResponse } from '../utils/Types.ts'

const apiUrl: string = 'http://localhost:3001';

export async function getTodosFromServer(
  page?: number,
  limit: number=1000,
  filter?: 'active' | 'completed' | 'all'
) {
  let url = `${apiUrl}/todos`;

  const params: string[] = [];
  if (page !== undefined) params.push(`page=${page}`);
  if (limit !== undefined) params.push(`limit=${limit}`);
  if (filter !== undefined) params.push(`filter=${filter}`);

  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }

  const response = await axios.get<FetchTodosResponse>(url);
  console.log(response.data);
  console.log(response.data.data);
  return response.data;
}

export async function deleteTodo(id: number) {
  const response = await axios.delete(`${apiUrl}/todos/${id}`);
  return response.data;
}

export const createTodo = async (text: string) => {
  const response = await axios.post(`${apiUrl}/todos`, { text });
  return response.data;
};

export async function updateTodo(
  id: number,
  text: string | null,
) {
  const response = await axios.put(`${apiUrl}/todos/${id}`, {text});
  return response.data;
}

export async function toggleTodo(id: number) {
  const response = await axios.patch(`${apiUrl}/todos/${id}/toggle`);
  return response.data;
}
