/**
 * Q4: 個別タスクコンポーネント
 *
 * TODO: 実装してください
 *
 * Props:
 *   task: Task
 *   onToggle: (id: number) => void
 *   onDelete: (id: number) => void
 *
 * 要件:
 * - <li data-testid={`task-${task.id}`}> で囲む
 * - checkbox: data-testid={`toggle-${task.id}`}
 * - タイトル: data-testid={`title-${task.id}`}  完了時は textDecoration: "line-through"
 * - 優先度: data-testid={`priority-${task.id}`} → [{task.priority}]
 * - 削除ボタン: data-testid={`delete-${task.id}`}
 */
import React from "react";
import { Task } from "../types"; // 型定義ファイルから Task 型をインポート
type TaskItemProps = {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
};
export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    return (
        <li data-testid={`task-${task.id}`}>
        <input
            type="checkbox"
            data-testid={`toggle-${task.id}`}
            checked={task.completed}
            onChange={() => onToggle(task.id)}
        />
        <span
            data-testid={`title-${task.id}`}
            style={{
                textDecoration: task.completed ? "line-through" : "none",
            }}
        >
            {task.title}
        </span>
        <span data-testid={`priority-${task.id}`}>
            [{task.priority}]
        </span>
        <button
            data-testid={`delete-${task.id}`}
            onClick={() => onDelete(task.id)}
        >
            削除
        </button>
    </li>
    );
};