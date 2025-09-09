export type ToDoItemType = {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

export type FetchTodosResponse = {
  data: ToDoItemType[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type Filter = 'active' | 'completed' | 'all'

export type ClickEvent = React.MouseEvent<HTMLButtonElement>
export type KeyEvent = React.KeyboardEvent<HTMLInputElement>
export type BlurEvent = React.FocusEvent<HTMLInputElement>

// export type ToDoListProps = {
//   sortOrder: 'active' | 'completed' | 'all';
//   todos: ToDoItemType[];
//   setSortOrder: (order: 'active' | 'completed' | 'all') => void;
//   handleEdit: (id: number, text: string) => void;
//   handleDeleteTodo: (id: number) => void;
//   handleToggleTodo: (id: number) => void;
//   handleSaveEdited: () => void;
//   editedId: number | null;
//   editedText: string | null;
//   setEditedText: (text: string) => void;
// };

export type ToDoItemProps = {
  item: ToDoItemType
  editedId: number | null
  setEditedId: (id: number | null) => void
  editedText: string | null
  setEditedText: (text: string) => void
}

export type AddToDoProps = { addToDoItem: (item: ToDoItemType) => void }
