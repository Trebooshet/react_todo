export type ToDoItemType = {
  id: number
  text: string
  completed: boolean
  createdAt: string
}

export type User = {
  id: number
  email: string
  age?: number
  createdAt?: Date
} | null

export interface AuthState {
  user: User
  token: string | null
  status: 'idle' | 'loading' | 'failed'
  isLoggedIn: boolean
}

export type Filter = 'active' | 'completed' | 'all'

export type ClickEvent = React.MouseEvent<HTMLButtonElement>
export type BlurEvent = React.FocusEvent<HTMLInputElement>
export type KeyEvent = React.KeyboardEvent<HTMLInputElement>

export type FetchTodosResponse = {
  data: ToDoItemType[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ToDoItemProps = {
  item: ToDoItemType
  editedId: number | null
  setEditedId: (id: number | null) => void
  editedText: string
  setEditedText: (text: string) => void
}

export type AddToDoProps = { addToDoItem: (item: ToDoItemType) => void }
