// import type { ToDoItemType } from './Types.ts';
//
// export function addToDoItem(
//   toDoItems: ToDoItemType[],
//   setToDoItems: React.Dispatch<React.SetStateAction<ToDoItemType[]>>,
//   toDo: ToDoItemType
// ) {
//   setToDoItems([...toDoItems, toDo]);
// }
//
// export function editToDoItem(
//   setToDoItems: React.Dispatch<React.SetStateAction<ToDoItemType[]>>,
//   id: string,
//   newText: string
// ) {
//   setToDoItems((prev: ToDoItemType[]) =>
//     prev.map((item) => (item.id === id ? { ...item, body: newText } : item))
//   );
// }
//
// export function deleteToDoItem(
//   toDoItems: ToDoItemType[],
//   setToDoItems: React.Dispatch<React.SetStateAction<ToDoItemType[]>>,
//   id: string
// ) {
//   const newToDoItems = toDoItems.filter((item) => item.id !== id);
//   setToDoItems(newToDoItems);
// }
//
// export function doneToggle(
//   setToDoItems: React.Dispatch<React.SetStateAction<ToDoItemType[]>>,
//   id: string
// ) {
//   setToDoItems((prev: ToDoItemType[]) =>
//     prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
//   );
// }
//
// // function sortToDoItems(toDoItems, setToDoItems) {
// //   const sortedToDos = toDoItems.map();
// //   setToDoItems(sortedToDos);
// // }
