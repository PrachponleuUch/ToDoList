import { useEffect, useState } from "react";
import "./style.css"
import { NewToDoForm } from "./NewToDoForm";
import { ToDoList } from "./ToDoList";

//! One function can only return one element, it can be solved by using a fragment element (<></>)
//! To change a state, you need to create a new state instead of mutating it
//! {() => function()} is recommended to use on most cases so as to prevent unexpected behavior 
//! Hooks must be at the top and can't be inside any condition or loops (the same hooks must be run every single time)
//? Inside useState is the default state of newItem unless changed using setNewItem
//? onChange is used so that the newItem value is changed and the page is rerendered every time an input is made so that it wouldn't remain in its default state(useState) 
//? Key is needed because it makes it so that react knows what to change what not to (optimized)
export default function App(){
  //? State is used to make it more interactive
  const [ todos, setTodos ] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue === null) return []
    return JSON.parse(localValue)
  });

  //? UseEffect executes its function every time its 2nd property changes
  useEffect(() => {
    localStorage.setItem('ITEM', JSON.stringify(todos))
  }, [todos])

  function addTodo(title){
    setTodos((currentTodos) => {
      return [...currentTodos, {id: crypto.randomUUID(), title, completed: false}]
    })
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => {
        return (todo.id !== id) 
      })
    })
  }
  
  //! Use props inside jsx function element to pass function between JSX files
  return (
    <> 
      <NewToDoForm onSubmit={addTodo}/>
      <h1 className="header">To Do List</h1>
      <ToDoList 
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  )
}