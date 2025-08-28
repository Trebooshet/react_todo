export type ToDoItemType = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
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
  editedText: string | null;
  setEditedText: (text: string) => void;
  handleEdit: (id: number, text: string) => void;
  handleSaveEdited: () => void;
  handleDeleteTodo: (id: number) => void;
  handleToggleTodo: (id: number) => void;
};

export type AddToDoProps = { addToDoItem: (item: ToDoItemType) => void };
