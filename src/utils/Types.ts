export type ToDoItemType = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

export type Filter = 'active' | 'completed' | 'all';

export type FetchTodosResponse = {
  data: ToDoItemType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ToDoItemProps = {
  item: ToDoItemType;
  editedId: number | null;
  setEditedId: (id: number | null) => void;
  editedText: string;
  setEditedText: (text: string) => void;
};


export type AddToDoProps = { addToDoItem: (item: ToDoItemType) => void };
