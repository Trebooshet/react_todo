import { HStack, IconButton, Image, Input, Text } from '@chakra-ui/react'
import { useRef } from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri'

import { editTodo, removeTodo, toggleTodoItem } from '@/store/todoSlice.ts'
import { useAppDispatch } from '@/utils/hooks.ts'
import type {
  BlurEvent,
  ClickEvent,
  KeyEvent,
  ToDoItemProps,
} from '@/utils/Types.ts'

import checkMark from '../../assets/foni-papik-pro-dddc-p-kartinki-zelenaya-galochka-na-prozrachnom-3.png'

export default function ToDoItem({
  item,
  editedId,
  setEditedId,
  editedText,
  setEditedText,
}: ToDoItemProps) {
  const dispatch = useAppDispatch()
  const editButtonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    if (!editedId) {
      dispatch(toggleTodoItem(item.id))
    }
  }

  const handleDelete = (e: ClickEvent) => {
    e.stopPropagation()
    dispatch(removeTodo(item.id))
  }

  const handleSaveEdit = () => {
    if (editedId && editedText) {
      dispatch(editTodo({ id: editedId, text: editedText }))
      setEditedId(null)
    }
  }

  const handleKeyDown = (e: KeyEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit()
    }
  }

  const handleBlur = (e: BlurEvent) => {
    if (e.relatedTarget === editButtonRef.current) return
    handleSaveEdit()
  }

  const handleEditButtonClick = (e: ClickEvent) => {
    e.stopPropagation()
    if (item.id === editedId) {
      dispatch(editTodo({ id: editedId!, text: editedText }))
      setEditedId(null)
    } else {
      if (item.completed) {
        dispatch(toggleTodoItem(item.id))
      }
      setEditedId(item.id)
      setEditedText(item.text)
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
      onClick={handleToggle}
      bgGradient={
        item.completed ? 'linear(to-r, green.500, green.900)' : 'transparent'
      }
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
        <Text flex="1" wordBreak="break-word">
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
          onClick={handleEditButtonClick}
        />
        <IconButton
          aria-label="delete To Do"
          rounded="full"
          icon={<RiDeleteBin6Line />}
          onClick={handleDelete}
        />
      </HStack>
    </HStack>
  )
}
