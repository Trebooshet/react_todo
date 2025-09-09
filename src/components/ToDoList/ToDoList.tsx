import { Badge, Box, Button, Image, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { fetchTodos } from '@/store/todoSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/hooks.ts'
import type { Filter, ToDoItemType } from '@/utils/Types.ts'

import photoOfMe from '../../assets/Photoroom_20250723_235615.png'
import ToDoItem from '../ToDoItem/ToDoItem'

function ToDoList() {
  const dispatch = useAppDispatch()

  const [editedId, setEditedId] = useState<number | null>(null)
  const [editedText, setEditedText] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<Filter>('all')

  const todos = useAppSelector((state) => state.todos.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const sortedToDoItems = (): ToDoItemType[] => {
    let filtered = todos

    if (sortOrder === 'active') {
      filtered = todos.filter((i: ToDoItemType) => !i.completed)
    } else if (sortOrder === 'completed') {
      filtered = todos.filter((i: ToDoItemType) => i.completed)
    }

    return [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }
  if (sortedToDoItems().length === 0) {
    return (
      <VStack>
        <Image
          boxSize="250px"
          objectFit="cover"
          src={photoOfMe}
          mt="4"
          ml="4"
          mb="-2"
        />
        <Badge
          variant="subtle"
          colorScheme="green"
          fontSize="lg"
          borderRadius="lg"
          p={2}
        >
          You have no any ToDos. Take a rest
        </Badge>
      </VStack>
    )
  }

  return (
    <Box>
      <VStack
        position="relative"
        w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }}
        mx="auto"
      >
        {todos.length > 2 && (
          <VStack position="absolute" right="-150px">
            <Button onClick={() => setSortOrder('all')}>All</Button>
            <Button onClick={() => setSortOrder('active')}>Active</Button>
            <Button onClick={() => setSortOrder('completed')}>Completed</Button>
          </VStack>
        )}
        {sortedToDoItems().map((toDoItem: ToDoItemType) => (
          <ToDoItem
            key={toDoItem.id}
            item={toDoItem}
            editedId={editedId}
            setEditedId={setEditedId}
            editedText={editedText}
            setEditedText={setEditedText}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default ToDoList
