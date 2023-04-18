import { useCollection } from '../hooks/useCollection'

import { db } from '../firebase/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'



export default function TodoList() {

  const { documents: todos } = useCollection('todos')

  const handleDelete = async (id) => {
    const docRef = doc(db, 'todos', id)
    await deleteDoc(docRef)
  }

  const handleDone = async (id) => {
    const docRef = doc(db, 'todos', id)
    await updateDoc(docRef, {done: true})
  }

  const handleUndone = async (id) => {
    const docRef = doc(db, 'todos', id)
    await updateDoc(docRef, {done: false})
  }

  const handleDeleteAll = async () => {
    await todos.forEach(todo => {
      handleDelete(todo.id)
    })
  }

  const handleDoneAll = async () => {
    await todos.forEach(todo => {
      handleDone(todo.id)
    })
  }

  const handleUndoneAll = async () => {
    await todos.forEach(todo => {
      handleUndone(todo.id)
    })
  }

  
  return (
    <div className="todo-list">
      <h2>Todo list</h2>
      <ul>
        {todos && todos.map(todo => (
          <li key={todo.id}>
              <h3
              className={ todo.done ? 'todo-done' : 'todo'}
              >
              {todo.title}
            </h3>
          
            {!todo.done && <button onClick={() => handleDone(todo.id)}>Done</button>}
            {todo.done && <button onClick={() => handleUndone(todo.id)}>Undo</button>}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleDeleteAll()}>Clear Items</button>
      {todos && todos.some(todo => !todo.done) && <button onClick={() => handleDoneAll()}>All Done</button>}
      {todos && todos.every(todo => todo.done) && <button onClick={() => handleUndoneAll()}>All Undone</button>}
    </div>
  )
}