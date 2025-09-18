import { Route, Routes } from 'react-router-dom'

import HomePage from '@/pages/HomePage.tsx'
import Layout from '@/pages/Layout.tsx'
import LoginForm from '@/pages/LoginForm.tsx'
import NotFoundPage from '@/pages/NotFoundPage.tsx'
import ProfilePage from '@/pages/ProfilePage.tsx'
import RegisterForm from '@/pages/RegisterForm.tsx'

// import AddToDo from '@/components/AddToDo/AddToDo'
// import Header from '@/components/Header.tsx'
// import ToDoList from '@/components/ToDoList/ToDoList'
// import Sorter from '@/components/Sorter.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={'/login'} element={<LoginForm />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/register'} element={<RegisterForm />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
  // return (
  //   <VStack p={4} spacing={2} align="stretch">
  //     <Header />
  //     <VStack minW={'600px'} w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }} mx="auto">
  //       <AddToDo />
  //       <Sorter />
  //       <ToDoList />
  //     </VStack>
  //   </VStack>
  // )
}

export default App
