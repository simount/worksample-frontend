/**
 * Q4: タスクリストコンポーネント
 *
 * TODO: 実装してください
 *
 * Props:
 *   tasks: Task[]
 *   onToggle: (id: number) => void
 *   onDelete: (id: number) => void
 *
 * 要件:
 * - <ul data-testid="task-list"> で囲む
 * - 各タスクを TaskItem で表示
 */
import { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul data-testid="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export {TaskList}
export default TaskList;
