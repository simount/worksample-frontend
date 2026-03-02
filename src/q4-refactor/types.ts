/**
 * Q4: 共通の型定義
 *
 * TODO: 以下の型を定義してください
 * - Priority: "high" | "medium" | "low"
 * - Filter: "all" | "active" | "completed"
 * - Task: { id, title, completed, priority }
 */
export type Priority = "high" | "medium" | "low";
export type Filter = "all" | "active" | "completed";
export interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority: Priority;
}