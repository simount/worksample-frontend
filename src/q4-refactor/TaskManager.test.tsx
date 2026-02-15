// ⚠️ このファイルは編集しないでください
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import TaskManager from "./TaskManager";

describe("Q4: TaskManager リファクタリング", () => {
  test("初期表示で統計が 0/0/0 である", () => {
    render(<TaskManager />);
    expect(screen.getByTestId("stats")).toHaveTextContent(
      "全体: 0 / 未完了: 0 / 完了: 0"
    );
  });

  test("タスクを追加できる", () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "テストタスク" } });
    fireEvent.change(screen.getByTestId("priority-select"), { target: { value: "high" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getByTestId("title-1")).toHaveTextContent("テストタスク");
    expect(screen.getByTestId("priority-1")).toHaveTextContent("[high]");
    expect(screen.getByTestId("stats")).toHaveTextContent("全体: 1 / 未完了: 1 / 完了: 0");
  });

  test("空のタスク名では追加されない", () => {
    render(<TaskManager />);
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getByTestId("stats")).toHaveTextContent("全体: 0 / 未完了: 0 / 完了: 0");
  });

  test("タスクの完了/未完了を切り替えられる", () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "切替テスト" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("toggle-1"));
    expect(screen.getByTestId("stats")).toHaveTextContent("完了: 1");
    fireEvent.click(screen.getByTestId("toggle-1"));
    expect(screen.getByTestId("stats")).toHaveTextContent("未完了: 1 / 完了: 0");
  });

  test("タスクを削除できる", () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "削除テスト" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("delete-1"));
    expect(screen.queryByTestId("task-1")).toBeNull();
    expect(screen.getByTestId("stats")).toHaveTextContent("全体: 0");
  });

  test("フィルターが正しく動作する", () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "タスクA" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "タスクB" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("toggle-1"));

    fireEvent.click(screen.getByTestId("filter-active"));
    expect(screen.queryByTestId("task-1")).toBeNull();
    expect(screen.getByTestId("task-2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("filter-completed"));
    expect(screen.getByTestId("task-1")).toBeInTheDocument();
    expect(screen.queryByTestId("task-2")).toBeNull();

    fireEvent.click(screen.getByTestId("filter-all"));
    expect(screen.getByTestId("task-1")).toBeInTheDocument();
    expect(screen.getByTestId("task-2")).toBeInTheDocument();
  });

  test("追加後にフォームがリセットされる", () => {
    render(<TaskManager />);
    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "リセットテスト" } });
    fireEvent.change(screen.getByTestId("priority-select"), { target: { value: "low" } });
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(screen.getByTestId("title-input")).toHaveValue("");
    expect(screen.getByTestId("priority-select")).toHaveValue("medium");
  });

  test("TaskForm, TaskList, TaskFilter, TaskItem が分割されている", async () => {
    const taskForm = await import("./components/TaskForm");
    const taskList = await import("./components/TaskList");
    const taskFilter = await import("./components/TaskFilter");
    const taskItem = await import("./components/TaskItem");
    expect(typeof taskForm.TaskForm).toBe("function");
    expect(typeof taskList.TaskList).toBe("function");
    expect(typeof taskFilter.TaskFilter).toBe("function");
    expect(typeof taskItem.TaskItem).toBe("function");
  });
});
