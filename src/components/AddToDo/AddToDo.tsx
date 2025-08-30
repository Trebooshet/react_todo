import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from '../../utils/hooks.ts'
import { addTodo } from '../../store/todoSlice.ts';

function AddToDo() {
  const [input, setInput] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const dispatch = useAppDispatch()

  const isError = input.trim().length === 0 && wasSubmitted;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWasSubmitted(false);
    setInput(e.target.value);
  }

  function handleAddButtonClick() {
    setWasSubmitted(true);
    if (input.trim().length === 0) return;

    dispatch(addTodo(input));
    setInput('');
    setWasSubmitted(false);
  }

  return (
    <VStack
      w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }}
      mx="auto"
      py="4"
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      mb="2"
    >
      <FormControl isInvalid={isError}>
        <FormLabel>New ToDo</FormLabel>
        <HStack>
          <Input
            type="text"
            value={input}
            placeholder="Write here"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddButtonClick();
              }
            }}
            minH="50"
          />
          <Button onClick={handleAddButtonClick}>Add</Button>
        </HStack>
        {isError && (
          <FormErrorMessage>Write something to create ToDo</FormErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
}

export default AddToDo;
