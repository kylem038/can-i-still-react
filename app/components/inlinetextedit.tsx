import React, { useEffect, useRef, useState } from "react";

type InlineTextEditProps = {
    completed: boolean;
    displayText: string;
    onSave: (newText: string) => void;
}

const InlineTextEdit = ({displayText, onSave, completed}: InlineTextEditProps) => {
    const [isEditting, setIsEditting] = useState(false);
    const [text, setText] = useState(displayText);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isEditting && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditting]);

    const handleSave = () => {
        setIsEditting(false);
        if(text.trimEnd() !== displayText) {
            onSave(text.trim());
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setIsEditting(false);
            setText(displayText);
        }
    }

    if(isEditting) {
        return <input
            className="border-2 rounded-lg pl-2"
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
        />
    }


    return <span className={completed ? "line-through" : "font-bold"} onClick={() => setIsEditting(true)}>{text}</span>
}

export default InlineTextEdit;