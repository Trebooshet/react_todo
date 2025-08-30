export type ToDoItemType = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

export type FetchTodosResponse = {
  data: ToDoItemType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};


export type ToDoListProps = {
  sortOrder: 'active' | 'completed' | 'all';
  todos: ToDoItemType[];
  setSortOrder: (order: 'active' | 'completed' | 'all') => void;
  handleEdit: (id: number, text: string) => void;
  handleDeleteTodo: (id: number) => void;
  handleToggleTodo: (id: number) => void;
  handleSaveEdited: () => void;
  editedId: number | null;
  editedText: string | null;
  setEditedText: (text: string) => void;
};

export type ToDoItemProps = {
  item: ToDoItemType;
  editedId: number | null;
  setEditedId: (id: number | null) => void;
  editedText: string | null;
  setEditedText: (text: string) => void;
  // handleEdit: (id: number, text: string) => void;
  // handleSaveEdited: () => void;
  // handleDeleteTodo: (id: number) => void;
  // handleToggleTodo: (id: number) => void;
};
// key={toDoItem.id}
// item={toDoItem}
// editedId={editedId}
// setEditedId = {setEditedId}
// editedText={editedText}
// setEditedText={setEditedText}

export type AddToDoProps = { addToDoItem: (item: ToDoItemType) => void };
