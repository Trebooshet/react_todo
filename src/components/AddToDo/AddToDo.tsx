import { useRef, useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

import { addTodo, fetchTodos } from '@/store/todoSlice.ts'
import { setPage } from '@/store/todoSlice.ts'
import { useAppDispatch, useAppSelector } from '@/utils/hooks.ts'

function AddToDo() {
  const [input, setInput] = useState('')
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const dispatch = useAppDispatch()
  const isError = input.trim().length === 0 && wasSubmitted
  const limit = useAppSelector((state) => state.todos.limit)
  const filter = useAppSelector((state) => state.todos.filter)
  const bg = useColorModeValue('blue.100', 'gray.800')
  const inputRef = useRef<HTMLInputElement>(null)
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWasSubmitted(false)
    setInput(e.target.value)
  }

  async function handleAddButtonClick() {
    try {
      setWasSubmitted(true)
      inputRef.current?.focus()
      if (input.trim().length === 0) return

      const inputUpperFirst = input.slice(0, 1).toUpperCase() + input.slice(1)

      await dispatch(addTodo(inputUpperFirst)).unwrap()
      setInput('')
      setWasSubmitted(false)

      dispatch(setPage(1))
      await dispatch(fetchTodos({ page: 1, limit, filter })).unwrap()
    } catch (err) {
      console.error('Add failed', err)
    }
  }

  return (
    <VStack w={'100%'} py="4" borderWidth="1px" borderColor="gray.500" borderRadius="md" p="2" bg={bg}>
      <FormControl isInvalid={isError}>
        <FormLabel>New ToDo</FormLabel>
        <HStack>
          <Input
            ref={inputRef}
            type="text"
            value={input}
            placeholder="Write here"
            borderColor={'grey.400'}
            autoComplete="off"
            onBlur={() => setWasSubmitted(false)}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                void handleAddButtonClick()
              }
            }}
            minH="50"
          />
          <Button onClick={handleAddButtonClick}>Add</Button>
        </HStack>
        {isError && <FormErrorMessage>Write something to create ToDo</FormErrorMessage>}
      </FormControl>
    </VStack>
  )
}

export default AddToDo
