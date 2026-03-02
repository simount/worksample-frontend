/**
 * Q4: タスク追加フォームコンポーネント
 *
 * TODO: 実装してください
 *
 * Props:
 *   onAdd: (title: string, priority: Priority) => void
 *
 * 要件:
 * - <div data-testid="task-form"> で囲む
 * - <input data-testid="title-input" />
 * - <select data-testid="priority-select">
 *     <option value="high">高</option>
 *     <option value="medium">中</option>
 *     <option value="low">低</option>
 *   </select>
 * - <button data-testid="add-btn">追加</button>
 * - 追加後、input は空文字、select は "medium" にリセット
 */
import React, { useState } from "react";
import { Priority } from "../types";
type TaskFormProps = {
    onAdd: (title: string, priority: Priority) => void;
};
export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const handleAdd = () => {
        if (!title.trim()) return;
        onAdd(title.trim(), priority);
        setTitle("");
        setPriority("medium");
    };
    return (
    <div data-testid="task-form">
        <input
            data-testid="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タスク名"
        />
        <select
            data-testid="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
        >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
        </select>
        <button data-testid="add-btn" onClick={handleAdd}>追加</button>
    </div>
    );
};
