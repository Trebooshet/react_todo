import { useEffect, useState } from 'react';
import { VStack } from '@chakra-ui/react';
import Header from './components/Header.tsx';
import AddToDo from './components/AddToDo/AddToDo';
import ToDoList from './components/ToDoList/ToDoList';

import {
  getTodosFromServer,
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from './api/todos';
import type { ToDoItemType } from './utils/Types';

function App() {
  const [todos, setTodos] = useState<ToDoItemType[]>([]);
  const [sortOrder, setSortOrder] = useState<'active' | 'completed' | 'all'>(
    'all'
  );

  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTodosFromServer();
        setTodos(res.data);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    }
    void fetchData();
  }, []);

  async function handleAddTodo(text: string) {
    try {
      const newTodo = await createTodo(text);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error('Ошибка добавления:', error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  }

  async function handleToggleTodo(id: number) {
    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (error) {
      console.error('Ошибка тогла:', error);
    }
  }

  function handleEdit(id: number, text: string) {
    setEditedId(id);
    setEditedText(text);
  }

  async function handleSaveEdited() {
    if (editedId && editedText && editedText.trim()) {
      try {
        const updated = await updateTodo(editedId, { text: editedText });
        setTodos((prev) => prev.map((t) => (t.id === editedId ? updated : t)));
      } catch (err) {
        console.error('Ошибка редактирования:', err);
      } finally {
        setEditedId(null);
        setEditedText('');
      }
    }
  }

  return (
    <VStack
      p={4}
      spacing={2}
      align="stretch"
    >
      <Header></Header>
      <AddToDo addToDoItem={handleAddTodo} />
      <ToDoList
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        todos={todos}
        handleEdit={handleEdit}
        handleSaveEdited={handleSaveEdited}
        editedId={editedId}
        editedText={editedText}
        setEditedText={setEditedText}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleTodo={handleToggleTodo}
      />
    </VStack>
  );
}

export default App;
