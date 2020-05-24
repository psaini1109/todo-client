import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleNotch, faList } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../models/TodoItem'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { TodoListName } from './TodoListName'
import {
  useAddTodoItemMutation,
  useDeleteTodoItemMutation, 
  useFetchTodoListsQuery,
  useUpdateTodoItemMutation,
  useUpdateTodoListMutation
} from '../utils/todo-hooks'

export const EditTodoList = () => {

  const { todoListId } = useParams()

  const { status, data: todoList } = useFetchTodoListsQuery(todoListId)
  const [deleteTodoItemMutation] = useDeleteTodoItemMutation()
  const [updateTodoItemMutation] = useUpdateTodoItemMutation()
  const [addTodoItemMutation] = useAddTodoItemMutation(todoListId)
  const [updateTodoListMutation] = useUpdateTodoListMutation()

  const addTodoItem = async (todoItem: TodoItem) => {
    await addTodoItemMutation({
      ...todoItem,
      todoListId: parseInt(todoListId, 10)
    })
  }

  const setTodoListName = async (name: string) => {
    if (todoList) {
      await updateTodoListMutation({ ...todoList, name })
    }
  }
  
  return (
    <>
      <Link className="block flex align-items-center mt-8" to="/">
        <span className="fa-layers fa-fw fa-3x block m-auto group">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600"
          />
          <FontAwesomeIcon icon={faList} inverse transform="shrink-8" />
        </span>
      </Link>

      {status !== 'success' && (
        <FontAwesomeIcon 
          icon={faCircleNotch} 
          size="2x"
          spin 
          className="block mx-auto mt-8 text-teal-500"
        />
      )}

      {status === 'success' && !!todoList && (
        <>
          <TodoListName
            todoListName={todoList.name}
            setTodoListName={setTodoListName}
          />
          <TodoInput addTodoItem={addTodoItem} />
          <TodoList
            todoItems={todoList.todoItems}
            updateTodoItem={updateTodoItemMutation}
            deleteTodoItem={deleteTodoItemMutation}
          />
        </>
      )}
    </>
  )
}
