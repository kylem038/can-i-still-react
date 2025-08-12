import React from "react";
import { InlineTextEdit, Todo } from "./index";

type TodoProps = Todo & {
    handleCompleted: (id: string) => void;
    handleRemoveTodo: (id: string) => void;
    handleUpdateTodoText: (newText: string) => void;
}

const TodoItem = ({ completed, displayText, id, handleCompleted, handleRemoveTodo, handleUpdateTodoText }: TodoProps) => {
    return (
        <div className="flex gap-[10px]" >
            <input type="checkbox" checked={completed} onChange={() => handleCompleted(id)} />
            <InlineTextEdit
                completed={completed} 
                displayText={displayText}
                onSave={handleUpdateTodoText} 
            />
            <button
                className="ml-2 text-red-500 font-bold hover:text-red-700"
                onClick={() => handleRemoveTodo(id)}
            >X</button>
        </div>
    );
};

export default TodoItem;