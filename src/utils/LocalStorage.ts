import type { ToDoItemType } from './Types.ts';

export function getToDoItemsFromLocalStorage(): ToDoItemType[] {
  const data: string | null = localStorage.getItem('toDoItems');
  return data ? JSON.parse(data) : [];
}

export function saveToDoItemsToLocalStorage(toDoItems: ToDoItemType[]): void {
  localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
}
