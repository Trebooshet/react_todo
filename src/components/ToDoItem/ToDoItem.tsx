import { HStack, Text, IconButton, Image, Input } from '@chakra-ui/react';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import type { ToDoItemProps } from '../../utils/Types.ts';
import { useRef } from 'react';
import { useAppDispatch } from '../../utils/hooks.ts'
import { removeTodo, editTodo, toggleTodoItem } from "../../store/todoSlice.ts";
import checkMark from '../../assets/foni-papik-pro-dddc-p-kartinki-zelenaya-galochka-na-prozrachnom-3.png';


export default function ToDoItem({
  item,
  editedId,
  setEditedId,
  editedText,
  setEditedText,
}: ToDoItemProps) {

  const dispatch = useAppDispatch();
  const editButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <HStack
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="md"
      p="2"
      w="full"
      justify="space-between"
      onClick={() => !editedId && dispatch(toggleTodoItem(item.id))}
      bgGradient={
        item.completed ? 'linear(to-r, green.500, green.900)' : 'transparent'
      }
    >
      {item.id === editedId ? (
        <Input
          value={editedText ?? ''}
          flex="1"
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              dispatch(editTodo({ id: editedId!,  text: editedText }));
              setEditedId(null)
            }
          }}
          onBlur={(e) => {
            if (e.relatedTarget === editButtonRef.current) return;
            dispatch(editTodo({ id: editedId!,  text: editedText }));
            setEditedId(null)
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
          onClick={(e) => {
            e.stopPropagation();
            if (item.id === editedId) {
              dispatch(editTodo({ id: editedId!,  text: editedText }));
              setEditedId(null)
            } else {
              if (item.completed) {
                dispatch(toggleTodoItem(item.id));
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
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeTodo(item.id));
          }}
        />
      </HStack>
    </HStack>
  );
}
