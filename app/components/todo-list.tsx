import React, { useEffect, useState } from "react";
import { TodoItem } from "./index";

import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = "todos";

export type Todo = {
    id: string;
    completed: boolean;
    displayText: string;
};

// Test data
// {id: uuidv4(), displayText: "Build this app", completed: false},
// {id: uuidv4(), displayText: "Save and load todos", completed: false},
// {id: uuidv4(), displayText: "Put recently completed todo at the bottom of the list", completed: false}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoDescription, setNewTodoDescription] = useState("");

    // Load saved TODOs on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if(saved) {
            setTodos(JSON.parse(saved));
        }
    }, []);

    // Update TODOs when adding, editting or deleting todos
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const handleCompleted = (id: string) => {
        const updatedTodos = todos.map(todo => {
            if(todo.id === id) todo.completed = !todo.completed;
            return todo;
        });
        const sortedTodos = moveCompletedTodoToBottom(updatedTodos, id);
        setTodos(sortedTodos);
    }

    const handleTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoDescription(e.target.value);
    }

    const handleNewTodo = () => {
        const updatedTodos = [...todos, { id: uuidv4(), displayText: newTodoDescription, completed: false }];
        const sortedTodos = updatedTodos.sort((a,b) => {
            if(a.completed === b.completed) return 0;
            return a.completed ? 1 : -1;
        });
        setTodos(sortedTodos);
        setNewTodoDescription("");
    }

    const handleRemoveTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    }

    const handleUpdateTodoText = (id: string, newText: string) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, displayText: newText } : todo));
    }

    const moveCompletedTodoToBottom = (updatedTodos: Todo[], id: string) => {
        const tempTodo = updatedTodos.find(todo => todo.id === id);
        const filterOutTodo = updatedTodos.filter(todo => todo.id !== id);
        if(!tempTodo) {
            return updatedTodos;
        }
        return [...filterOutTodo, tempTodo];
    }

    return (
        <>
            <div className="flex">
                <input 
                    className="border-2 rounded-lg pl-2" 
                    type="text" 
                    placeholder="To do description"
                    onChange={(e) => handleTodoInput(e)}
                    value={newTodoDescription}
                />
                <button 
                    className="border-2 rounded-lg mx-3" 
                    onClick={() => handleNewTodo()}
                    disabled={newTodoDescription.length === 0}
                >Add Todo</button>
            </div>
            
            {todos.map((todo) => 
                <TodoItem 
                    key={todo.id} 
                    id={todo.id} 
                    displayText={todo.displayText} 
                    completed={todo.completed}
                    handleCompleted={handleCompleted}
                    handleRemoveTodo={handleRemoveTodo}
                    handleUpdateTodoText={(newText: string) => handleUpdateTodoText(todo.id, newText)}
                />
            )}
        </>
    )
}

export default TodoList;