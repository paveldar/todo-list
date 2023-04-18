
import { useState, useEffect } from 'react'

import { db } from '../firebase/config'
import { collection, addDoc } from 'firebase/firestore'



export default function Create() {  
  const [newTodo, setNewTodo] = useState('')
  const [newTodoOk, setNewTodoOk] = useState(false)
  const [done, setDone] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const ref = collection(db, 'todos')

    await addDoc(ref, {
        title: newTodo,
        done: done
    })

    setNewTodo('')
    setDone(false)
  }

  useEffect(() => {
    // Regular expression
    const regex = /[a-zA-Z]/;

    // Check if string contains letters
    setNewTodoOk(regex.test(newTodo) && newTodo.length >= 2);

}, [newTodo])


  

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>

        <label>
          <input 
            type="text"
            placeholder="add your to-do"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            required
          />
        </label>
        {newTodoOk && <button className="btn">submit</button>}
        {!newTodoOk && <button className="btn-disabled" disabled>submit</button>}
        <p className="warning">{!newTodoOk && newTodo.length ? "Enter a valid todo" : ""}</p>
      </form>
    </div>
  )
}