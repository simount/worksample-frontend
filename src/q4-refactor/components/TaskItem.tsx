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
