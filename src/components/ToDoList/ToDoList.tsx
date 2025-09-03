import ToDoItem from '../ToDoItem/ToDoItem';
import { Box, VStack, Image, Badge, Button, Text, HStack } from '@chakra-ui/react';
import type { ToDoItemType } from '../../utils/Types.ts';
import photoOfMe from '../../assets/Photoroom_20250723_235615.png';
import { useAppSelector, useAppDispatch } from '../../utils/hooks.ts';
import Pagination from "../Pagination/Pagination.tsx";
import { useEffect, useState } from "react";
import {fetchTodos, setPage, setLimit, setFilter} from "../../store/todoSlice.ts";

function ToDoList() {
  const dispatch = useAppDispatch();
  const [editedId, setEditedId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string | null>(null);

  const todos = useAppSelector(state => state.todos.todos);
  const totalItems = useAppSelector(state => state.todos.totalItems)
  const totalPages = useAppSelector(state => state.todos.totalPages)
  const page = useAppSelector(state => state.todos.page)
  const limit = useAppSelector(state => state.todos.limit)
  const filter = useAppSelector(state => state.todos.filter)
  // const isLoading = useAppSelector(state => state.todos.isLoading)

  useEffect(() => {
    dispatch(fetchTodos({page, limit, filter}));
  }, [dispatch, page, limit, filter]);

  // if (isLoading) {
  //   return <Image
  //     boxSize="100px"
  //     position="absolute"
  //     top="100%"
  //     left="48%"
  //     src={photoOfMe}
  //   />;
  // }

  if (todos.length === 0) {
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
    <Box position="relative" >
      <VStack
        position="relative"
        w={{ base: '90%', sm: '80%', md: '70%', lg: '60%' }}
        mx="auto"
      >
        {totalItems > 2 && (
          <VStack alignItems={"start"} position="absolute" right="-125px">
            <Button onClick={() => dispatch(setFilter('all'))}>All</Button>
            <Button onClick={() => dispatch(setFilter('active'))}>Active</Button>
            <Button onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
          </VStack>
        )}
        {totalItems > 5 && (
          <VStack  alignItems={"end"} position="absolute" left="-112px" >
            <VStack alignItems={"end"}>
              <Button w={14} onClick={() => dispatch(setLimit(5))}>5</Button>
              <Button w={14} onClick={() => dispatch(setLimit(10))}>10</Button>
              <Button w={14} onClick={() => dispatch(setLimit(20))}>20</Button>
            </VStack>
            <Text >Items on page</Text>
          </VStack>
        )}
        {todos.map((toDoItem: ToDoItemType) => (
          <ToDoItem
            key={toDoItem.id}
            item={toDoItem}
            editedId={editedId}
            setEditedId={setEditedId}
            editedText={editedText}
            setEditedText={setEditedText}
          />
        ))}
        <HStack>
          <Pagination
            pageCount={totalPages}
            setPage={(newPage)=> dispatch(setPage(newPage))}
            currentPage={page}
          />
          <Text
          border={"1px solid green"}
          p={1.5}
          rounded="50"
          >{totalItems} Todos</Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ToDoList;
