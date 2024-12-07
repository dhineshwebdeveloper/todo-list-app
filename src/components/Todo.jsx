import React , { useEffect, useRef, useState } from "react"
import { TodoList } from "./TodoList"

export const Todo = () => {
    const [todolist, setTodolist] = useState(() => {
        try {
            const savedTodos = localStorage.getItem("todos");
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return [];
        }
    });
    
    const inputRef = useRef()

//update localstorage 
useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
}, [todolist]);
   

//Add new task
    const addTask = () => {
        const inputText = inputRef.current.value.trim();
        if(inputText === ""){
            return null;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        };
        setTodolist((prev) => [...prev, newTodo]);
        inputRef.current.value = ""
    }
//update task status

const toggleTask = (id) => {
    setTodolist((perv) => {
        return perv.map((todo) => {
            if(id === todo.id){
                return{...todo, isComplete:!todo.isComplete}
            }
            return todo;
        })
    })
}

//Delete Todo Item 

const deleteTodo = (id) => {
    setTodolist((prev) => {
        return prev.filter((todo) => todo.id !== id)
    })
}
    return (
        <>
            <div className="w-[30-rem]">

                <h1 className="text-lg my-2 font-medium text-amber-500">
                    To Do List
                </h1>
                <div className="flex gap-2 ">
                    <div className="flex-1">
                        <input ref={inputRef} type="text" className="py-3 px-4 w-full text-sm border focus:outline-none focus:border-amber-400" placeholder="Add Your Task" />
                    </div>
                    <button onClick={addTask} className="py-3 px-4 bg-blue-600
            text-white hover:bg-blue-700 text-sm font-medium rounded-sm border-none">Add Task</button>

                </div>
                <p className="my-3 text-sm text-zinc-400 px-1">Fill task details</p>


            </div>
            <div className="w-[30-rem] bg-white shadow py-6 px-4">
                <fieldset className=" space-y-3 ">
                    <legend className="text-pink-600 font-medium">List of task</legend>

                    {/* list Item start */}
                    {todolist.length === 0 ?(
                        <p className="text-gray-500 text-sm"> no tasks fount</p>
                    )   : (
                        todolist.map((todo, index) => {
                            return <TodoList text={todo.text} key={index} 
                            isComplete={todo.isComplete} id={todo.id} 
                            toggleTask={toggleTask} deleteTodo={deleteTodo}/>
                        }) 
                    )}
                    
                         
                    {/* list Item end */}

                </fieldset>
            </div>
        </>
    )
}
