import { VStack } from '@chakra-ui/react'

import AddToDo from '@/components/AddToDo/AddToDo'
import Sorter from '@/components/Sorter.tsx'
import ToDoList from '@/components/ToDoList/ToDoList'

function HomePage() {
  return (
    <VStack p={4} spacing={2} align="stretch">
      <VStack minW={'600px'} w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }} mx="auto">
        <AddToDo />
        <Sorter />
        <ToDoList />
      </VStack>
    </VStack>
  )
}

export default HomePage
