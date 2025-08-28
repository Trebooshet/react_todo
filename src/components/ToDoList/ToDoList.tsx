import ToDoItem from '../ToDoItem/ToDoItem';
import { Box, VStack, Image, Badge, Button } from '@chakra-ui/react';
import type { ToDoItemType, ToDoListProps } from '../../utils/Types.ts';
import photoOfMe from '../../assets/Photoroom_20250723_235615.png';

function ToDoList({
  todos = [],
  sortOrder,
  setSortOrder,
  handleEdit,
  handleDeleteTodo,
  handleToggleTodo,
  handleSaveEdited,
  editedId,
  editedText,
  setEditedText,
}: ToDoListProps) {
  const sortedToDoItems = (): ToDoItemType[] => {
    let filtered = todos;

    if (sortOrder === 'active') {
      filtered = todos.filter((i) => !i.completed);
    } else if (sortOrder === 'completed') {
      filtered = todos.filter((i) => i.completed);
    }

    return [...filtered].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };
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
    );
  }

  return (
    <Box>
      <VStack
        position="relative"
        w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }}
        mx="auto"
      >
        {todos.length > 2 && (
          <VStack
            position="absolute"
            right="-150px"
          >
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
            editedText={editedText}
            setEditedText={setEditedText}
            handleEdit={handleEdit}
            handleSaveEdited={handleSaveEdited}
            // handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleTodo={handleToggleTodo}
          />
        ))}
      </VStack>
    </Box>
  );
}

export default ToDoList;
