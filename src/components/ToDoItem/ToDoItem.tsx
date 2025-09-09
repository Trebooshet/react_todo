import { HStack, Text, IconButton, Image, Input } from '@chakra-ui/react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import type { ToDoItemProps } from '../../utils/Types.ts';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks.ts'
import { fetchTodos, removeTodo, editTodo, toggleTodoItem, setPage } from "../../store/todoSlice.ts";

import checkMark from '../../assets/foni-papik-pro-dddc-p-kartinki-zelenaya-galochka-na-prozrachnom-3.png';
// import addToDo from "../AddToDo/AddToDo.tsx";

export default function ToDoItem({
  item,
  editedId,
  setEditedId,
  editedText,
  setEditedText,
}: ToDoItemProps) {

  const dispatch = useAppDispatch();
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const { page, limit, filter } = useAppSelector(s => s.todos);

  const handleDeleteTodo = async (id: number) => {
    try {
      await dispatch(removeTodo(id)).unwrap();
      const res = await dispatch(fetchTodos({ page, limit, filter })).unwrap();

      if ((res.data.length === 0 ) && page > 1) {
        const newPage = Math.max(1, page - 1);
        dispatch(setPage(newPage));
        await dispatch(fetchTodos({ page: newPage, limit, filter })).unwrap();
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEditTodo = async (id:number, text: string) => {

    try {
      await dispatch(editTodo({id, text})).unwrap()
      setEditedId(null)
    } catch (err) {
      console.log('Edit error', err);
    }
  }

  const handleToggleTodo = async (id: number) => {
    try {
      await dispatch(toggleTodoItem(id)).unwrap()
    } catch (err) {
      console.log('Toggle error', err);
    }
  }

  return (
    <HStack
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      w="full"
      justify="space-between"
      onClick={() => !editedId && handleToggleTodo(item.id)}
      bgGradient={
        item.completed ? 'linear(to-r, green.500, green.900)' : 'transparent'
      }
    >
      {item.id === editedId ? (
        <Input
          value={editedText ?? ''}
          flex="1"
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await handleEditTodo(editedId,  editedText )
            }
          }}
          onBlur={async (e) => {
            if (e.relatedTarget === editButtonRef.current) return;
            await handleEditTodo(editedId,  editedText )
          }}
          autoFocus
        />
      ) : (
        <Text
          flex="1"
          wordBreak="break-word"
        >
          {item.text}
        </Text>
      )}

      <HStack>
        {item.completed && (
          <Image
            boxSize="36px"
            rounded="full"
            objectFit="cover"
            src={checkMark}
          />
        )}
        <IconButton
          aria-label="edit To Do"
          ref={editButtonRef}
          rounded="full"
          icon={<RiEdit2Line />}
          onClick={async (e) => {
            e.stopPropagation();
            if (item.id === editedId) {
             await handleEditTodo(editedId,  editedText )
            } else {
              if (item.completed) {
              void  handleToggleTodo(item.id);
              }
              setEditedId(item.id)
              setEditedText(item.text)
            }
          }}
        />
        <IconButton
          aria-label="delete To Do"
          rounded="full"
          icon={<RiDeleteBin6Line />}
          onClick={async (e) => {
            e.stopPropagation();
            await handleDeleteTodo(item.id);
          }}
        />
      </HStack>
    </HStack>
  );
}
