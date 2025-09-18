import { useRef } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'
import { Box,HStack, IconButton, Image, Input, Text, VStack } from '@chakra-ui/react'

import checkMark from '@/assets/foni-papik-pro-dddc-p-kartinki-zelenaya-galochka-na-prozrachnom-3.png'
import { editTodo, fetchTodos, removeTodo, setPage, toggleTodoItem } from '@/store/todoSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/hooks.ts'
import type { BlurEvent, ClickEvent, KeyEvent, ToDoItemProps } from '@/utils/Types.ts'

export default function ToDoItem({ item, editedId, setEditedId, editedText, setEditedText }: ToDoItemProps) {
  const dispatch = useAppDispatch()
  const editButtonRef = useRef<HTMLButtonElement>(null)
  const { page, limit, filter } = useAppSelector((s) => s.todos)

  const date = new Date(item.createdAt).toLocaleDateString()
  const time = new Date(item.createdAt).toLocaleTimeString()

  const handleDelete = async (id: number) => {
    try {
      await dispatch(removeTodo(id)).unwrap()
      const res = await dispatch(fetchTodos({ page, limit, filter })).unwrap()

      if (res.data.length === 0 && page > 1) {
        const newPage = Math.max(1, page - 1)
        dispatch(setPage(newPage))
        await dispatch(fetchTodos({ page: newPage, limit, filter })).unwrap()
      }
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const handleEdit = async (id: number, text: string) => {
    try {
      await dispatch(editTodo({ id, text })).unwrap()
      setEditedId(null)
    } catch (err) {
      console.log('Edit error', err)
      throw err
    }
  }

  const handleToggle = async (id: number) => {
    try {
      if (!editedId) await dispatch(toggleTodoItem(id)).unwrap()
    } catch (err) {
      console.log('Toggle error', err)
    }
  }

  const handleKeyDown = async (e: KeyEvent) => {
    try {
      if (e.key === 'Enter') {
        await handleEdit(editedId!, editedText)
      }
    } catch (err) {
      console.log('Error', err)
    }
  }

  const handleBlur = async (e: BlurEvent) => {
    if (e.relatedTarget === editButtonRef.current) return
    try {
      await handleEdit(editedId!, editedText)
    } catch (err) {
      console.log('Error', err)
    }
  }

  const handleEditButtonClick = async (e: ClickEvent) => {
    try {
      e.stopPropagation()
      if (item.id === editedId) {
        await handleEdit(editedId, editedText)
      } else {
        if (item.completed) {
          void handleToggle(item.id)
        }
        setEditedId(item.id)
        setEditedText(item.text)
      }
    } catch (err) {
      console.log('Error', err)
    }
  }

  return (
    <HStack
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      w="100%"
      justify="space-between"
      onClick={() => handleToggle(item.id)}
      bgGradient={item.completed ? 'linear(to-r, green.500, green.900)' : 'linear(to-r, teal.500,teal.700, #1A202C)'}
    >
      {item.id === editedId ? (
        <Input
          value={editedText ?? ''}
          flex="1"
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <HStack justify="space-between" w="100%">
          <Text flex="1" wordBreak="break-word">
            {item.text}
          </Text>
          <VStack alignItems={'end'}>
            <Text color={'orange.100'}>{date}</Text>
            <Text color={'orange.100'}>{time}</Text>
          </VStack>
        </HStack>
      )}

      <HStack>
        <Box boxSize="36px">
          {item.completed && <Image boxSize="36px" rounded="full" objectFit="cover" src={checkMark} />}
        </Box>
        <IconButton
          aria-label="edit To Do"
          ref={editButtonRef}
          rounded="full"
          icon={<RiEdit2Line />}
          onClick={handleEditButtonClick}
        />
        <IconButton
          aria-label="delete To Do"
          rounded="full"
          icon={<RiDeleteBin6Line />}
          onClick={(e) => {
            e.stopPropagation()
            void handleDelete(item.id)
          }}
        />
      </HStack>
    </HStack>
  )
}
