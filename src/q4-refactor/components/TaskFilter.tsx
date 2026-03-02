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
import React from "react";
import { Filter } from "../types"; // 型定義ファイルからインポート
type TaskFilterProps = {
    current: Filter;
    onChange: (filter: Filter) => void;
};

export const TaskFilter: React.FC<TaskFilterProps> = ({ current, onChange }) => {
    const filters: { type: Filter; label: string }[] = [
        { type: "all", label: "すべて" },
        { type: "active", label: "未完了" },
        { type: "completed", label: "完了" },
    ];
    return (
        <div data-testid="task-filter">
            {filters.map((f) => (
                <button
                    key={f.type}
                    data-testid={`filter-${f.type}`}
                    onClick={() => onChange(f.type)}
                    style={{
                        fontWeight: current === f.type ? "bold" : "normal",
                    }}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
};
