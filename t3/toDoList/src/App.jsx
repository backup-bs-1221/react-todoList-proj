import "./styles.css"
import { useEffect, useState } from "react"

export default function App() {
    const [newItem, setNewItem] = useState("")
    const [todos, setTodos ] = useState( () =>{
        const localValue = localStorage.getItem("ITEMS")
        console.log("localValue" + localValue)
        if (localValue == null ) return []
        return JSON.parse(localValue)
    }) 

    
    useEffect( () => {  //hooks
        localStorage.setItem("ITEM", JSON.stringify(todos))
    }, [todos] )

    function handleSubmit(e) {
        e.preventDefault()

        setTodos( (currentTodos) => {
            return [
                ...currentTodos,
                {id:crypto.randomUUID(), title:newItem, completed:false }, 
            ]
        })
        
        setNewItem("")
    }

    function toggleTodo (id, completed) {
        setTodos(currentTodos   =>{
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

    console.log(todos)
    return (
        <>
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form-row">
                    <label htmlFor="item"> New Item </label>
                    <input
                        value={newItem}
                        onChange={e => setNewItem(e.target.value )} 
                        type="text" id="item" />
                </div>
                <button className="btn"> Add </button>
            </form>
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
                
            {/* <ul className="list">
                <li>
                    <label>
                        <input type="checkbox" />
                        Item 1
                    </label>
                    <button className="btn btn-danger"> Delete </button>
                </li>
            </ul>

            <ul className="list">
                <li>
                    <label>
                        <input type="checkbox" />
                        Item 2
                    </label>
                    <button className="btn btn-danger"> Delete </button>
                </li>
            </ul> */}

        </>
    )
}