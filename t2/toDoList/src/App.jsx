import "./styles.css"
import { NewTodoForm } from "./form"
import { useState } from "react"

export default function App() {

    const [todos, setTodos ] = useState([]) 
    
    function addTodo(title){
        setTodos( (currentTodos) => {
            return [
                ...currentTodos,
                {id:crypto.randomUUID(), title: title, completed: false }, 
            ]
        })
    }

    function toggleTodo (id, completed) {
        setTodos(currentTodos   => {
            return currentTodos.map (    todos => {
                console.log(todos)
                if(todos.id === id){
                    return {    ...todos, completed}
                }
                return todos 
            })
        })
    }

    function deleteTodo(id){
        setTodos( currentTodos=>{
            return currentTodos.filter ( todos => todos.id !== id ) 
        })
    }

    // console.log(todos)
    return (
        <>
            <NewTodoForm addTodo={addTodo} />
            <h1> TODO List </h1>

            <ul className="list">
                {todos.length === 0 &&  "No ToDos"}
                {todos.map(todos => {
                    return(
                        <li key={todos.id} > 
                            <label>
                                <input type="checkbox" checked={todos.completed} 
                                onChange={  e => toggleTodo(todos.id, e.target.checked)    }   
                                />
                                {todos.title}
                            </label>
                            <button 
                                onClick={() => deleteTodo(todos.id)} 
                                // onClick={deleteTodo(todos.id)} 
                                className="btn btn-danger"> 
                            Delete </button>
                        </li>
                    )
                })}
                
            </ul>
                
           

        </>
    )
}