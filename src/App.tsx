import { VStack } from '@chakra-ui/react'

import AddToDo from '@/components/AddToDo/AddToDo'
import Header from '@/components/Header.tsx'
import ToDoList from '@/components/ToDoList/ToDoList'

function App() {
  return (
    <VStack p={4} spacing={2} align="stretch">
      <Header />
      <AddToDo />
      <ToDoList />
    </VStack>
  )
}

export default App
