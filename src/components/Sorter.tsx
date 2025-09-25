import { Button, HStack, Text } from '@chakra-ui/react'

import { setFilter, setLimit } from '@/store/todoSlice.ts'
import { useAppDispatch } from '@/utils/hooks.ts'

export default function Sorter() {
  const dispatch = useAppDispatch()

  return (
    <>
      <HStack justify={'space-between'} w={'100%'} mx="auto">
        <HStack>
          <Button onClick={() => dispatch(setFilter('all'))}>All</Button>
          <Button onClick={() => dispatch(setFilter('active'))}>Active</Button>
          <Button onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
          <Text>Filter</Text>
        </HStack>
        <HStack>
          <HStack>
            <Text>Todos on page</Text>
            <Button w={14} onClick={() => dispatch(setLimit(5))}>
              5
            </Button>
            <Button w={14} onClick={() => dispatch(setLimit(10))}>
              10
            </Button>
            <Button w={14} onClick={() => dispatch(setLimit(20))}>
              20
            </Button>
          </HStack>
        </HStack>
      </HStack>
    </>
  )
}
