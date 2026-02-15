// ⚠️ このファイルは参考用です。編集不要です。
// この巨大コンポーネントを、types.ts と components/ 配下に分割してください。
// 分割後のコンポーネントを使って TaskManager.tsx を再構成してください。

import React, { useState } from "react";

type Priority = "high" | "medium" | "low";
type Filter = "all" | "active" | "completed";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [nextId, setNextId] = useState(1);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks([...tasks, { id: nextId, title: title.trim(), completed: false, priority }]);
    setNextId(nextId + 1);
    setTitle("");
    setPriority("medium");
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
      <div data-testid="task-form">
        <input data-testid="title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タスク名" />
        <select data-testid="priority-select" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <button data-testid="add-btn" onClick={addTask}>追加</button>
      </div>
      <div data-testid="task-filter">
        {(["all", "active", "completed"] as Filter[]).map((f) => (
          <button key={f} data-testid={`filter-${f}`} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? "bold" : "normal" }}>
            {f === "all" ? "すべて" : f === "active" ? "未完了" : "完了"}
          </button>
        ))}
      </div>
      <ul data-testid="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} data-testid={`task-${task.id}`}>
            <input type="checkbox" data-testid={`toggle-${task.id}`} checked={task.completed} onChange={() => toggleTask(task.id)} />
            <span data-testid={`title-${task.id}`} style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</span>
            <span data-testid={`priority-${task.id}`}>[{task.priority}]</span>
            <button data-testid={`delete-${task.id}`} onClick={() => deleteTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
