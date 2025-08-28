import axios from 'axios';

const apiUrl: string = 'http://localhost:3001';

export async function getTodosFromServer(
  page?: number,
  limit?: number,
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

  const response = await axios.get(url);
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
  data: { text?: string; completed?: boolean }
) {
  const response = await axios.put(`${apiUrl}/todos/${id}`, data);
  return response.data;
}

export async function toggleTodo(id: number) {
  const response = await axios.patch(`${apiUrl}/todos/${id}/toggle`);
  return response.data;
}
