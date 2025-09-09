import axios from 'axios';
import type { FetchTodosResponse } from '../utils/Types.ts'

const apiUrl: string = 'http://localhost:3001';

export async function getTodosFromServer(
  page: number = 1,
  limit: number = 5,
  filter: 'active' | 'completed' | 'all' = 'all',
) {
  let url = `${apiUrl}/todos`;

  const params: string[] = [];
  params.push(`page=${page}`);
  params.push(`limit=${limit}`);
  params.push(`filter=${filter}`);

  url += `?${params.join('&')}`;

  const response = await axios.get<FetchTodosResponse>(url);
  console.log(response.data);
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
