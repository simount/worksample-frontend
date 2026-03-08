/**
 * ===================================================
 * Q4: コンポーネント設計・リファクタリング
 *     （制限時間 30分 / 配点 25点）
 * ===================================================
 *
 * TODO: TaskManager.original.tsx を参考に、
 *       分割したコンポーネントを組み合わせてこのファイルを実装してください
 *
 * 要件:
 * - 状態管理（tasks, filter, nextId）はここに集約
 * - stats の計算と表示もここで行う
 * - data-testid="stats" の表示:
 *   全体: {total} / 未完了: {active} / 完了: {completed}
 * - TaskForm, TaskFilter, TaskList を使って構成
 * - default export すること
 */

import React, { useState } from "react";
import { Task, Priority, Filter } from "./types";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";



const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [nextId, setNextId] = useState(1);

  const addTask = (title: string, priority: Priority) => {
    setTasks([...tasks, { id: nextId, title, completed: false, priority }]);
    setNextId(nextId + 1);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div>
      <h1>タスク管理</h1>
      <div data-testid="stats">
        全体: {stats.total} / 未完了: {stats.active} / 完了: {stats.completed}
      </div>
      <TaskForm onAdd={addTask} />
      <TaskFilter current={filter} onChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default TaskManager;
