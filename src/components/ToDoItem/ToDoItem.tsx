import { HStack, Text, IconButton, Image, Input } from '@chakra-ui/react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import type { ToDoItemProps } from '../../utils/Types.ts';
import checkMark from '../../assets/foni-papik-pro-dddc-p-kartinki-zelenaya-galochka-na-prozrachnom-3.png';

export default function ToDoItem({
  item,
  editedId,
  editedText,
  setEditedText,
  handleEdit,
  handleSaveEdited,
  handleDeleteTodo,
  handleToggleTodo,
  // handleUpdateTodo,
}: ToDoItemProps) {
  return (
    <HStack
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      w="full"
      justify="space-between"
      onClick={() => editedId !== item.id && handleToggleTodo(item.id)}
      bgGradient={
        item.completed ? 'linear(to-r, green.500, green.900)' : 'transparent'
      }
    >
      {item.id === editedId ? (
        <Input
          value={editedText ?? ''}
          flex="1"
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdited()}
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
          rounded="full"
          icon={<RiEdit2Line />}
          onClick={(e) => {
            e.stopPropagation();
            if (item.id === editedId) {
              handleSaveEdited();
            } else {
              if (item.completed) {
                handleToggleTodo(item.id);
              }
              handleEdit(item.id, item.text);
            }
          }}
        />
        <IconButton
          aria-label="delete To Do"
          rounded="full"
          icon={<RiDeleteBin6Line />}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTodo(item.id);
          }}
        />
      </HStack>
    </HStack>
  );
}
