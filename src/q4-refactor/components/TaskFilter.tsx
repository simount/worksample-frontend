/**
 * Q4: フィルターコンポーネント
 *
 * TODO: 実装してください
 *
 * Props:
 *   current: Filter
 *   onChange: (filter: Filter) => void
 *
 * 要件:
 * - <div data-testid="task-filter"> で囲む
 * - 3つのボタン: data-testid="filter-all" / "filter-active" / "filter-completed"
 * - ラベル: "すべて" / "未完了" / "完了"
 * - 現在選択中のフィルターは fontWeight: "bold"
 */

import { Filter } from "../types";

// フィルターボタン
// 要件: 
// - 3つのボタン: data-testid="filter-all" / "filter-active" / "filter-completed"
// - ラベル: "すべて" / "未完了" / "完了"
const FILTER_OPTIONS: { value: Filter; label: string; testId: string }[] = [
  { value: "all",       label: "すべて", testId: "filter-all"       },
  { value: "active",    label: "未完了", testId: "filter-active"    },
  { value: "completed", label: "完了",   testId: "filter-completed" },
];

// 
interface TaskFilterProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ current, onChange }) => {
  return (
    <div data-testid="task-filter">
      {FILTER_OPTIONS.map(({ value, label, testId }) => (
        <button
          key={value}
          data-testid={testId}
          onClick={() => onChange(value)}
          style={{
            fontWeight: current === value ? "bold" : "normal",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export {TaskFilter};
export default TaskFilter;