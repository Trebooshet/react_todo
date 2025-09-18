import { useEffect, useState } from 'react'
import { Badge, Box, HStack, Image, Text, VStack } from '@chakra-ui/react'

import photoOfMe from '@/assets/Photoroom_20250723_235615.png'
import Pagination from '@/components/Pagination/Pagination.tsx'
import ToDoItem from '@/components/ToDoItem/ToDoItem.tsx'
import { fetchTodos, setPage } from '@/store/todoSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/hooks.ts'
import type { ToDoItemType } from '@/utils/Types.ts'

function ToDoList() {
  const dispatch = useAppDispatch()
  const [editedId, setEditedId] = useState<number | null>(null)
  const [editedText, setEditedText] = useState<string>('')

  const todos = useAppSelector((state) => state.todos.todos)
  const totalItems = useAppSelector((state) => state.todos.totalItems)
  const totalPages = useAppSelector((state) => state.todos.totalPages)
  const page = useAppSelector((state) => state.todos.page)
  const limit = useAppSelector((state) => state.todos.limit)
  const filter = useAppSelector((state) => state.todos.filter)

  useEffect(() => {
    dispatch(fetchTodos({ page, limit, filter }))
  }, [dispatch, page, limit, filter])

  if (todos.length === 0) {
    return (
      <VStack>
        <Image boxSize="250px" objectFit="cover" src={photoOfMe} mt="4" ml="4" mb="-2" />
        <Badge variant="subtle" colorScheme="green" fontSize="lg" borderRadius="lg" p={2}>
          You have no any ToDos. Take a rest
        </Badge>
      </VStack>
    )
  }

  return (
    <Box position="relative" w="100%">
      <VStack position="relative" w="100%">
        {todos.map((toDoItem: ToDoItemType) => (
          <ToDoItem
            key={toDoItem.id}
            item={toDoItem}
            editedId={editedId}
            setEditedId={setEditedId}
            editedText={editedText}
            setEditedText={setEditedText}
          />
        ))}
        <HStack>
          <Pagination pageCount={totalPages} setPage={(newPage) => dispatch(setPage(newPage))} currentPage={page} />
          <Text border={'1px solid green'} p={1.5} rounded="50">
            {totalItems} Todos
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ToDoList
