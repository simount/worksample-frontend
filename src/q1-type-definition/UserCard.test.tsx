// ⚠️ このファイルは編集しないでください
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { UserCard } from "./UserCard";

describe("Q1: UserCard 型定義 + コンポーネント実装", () => {
  test("必須 Props で正しくレンダリングされる", () => {
    render(
      <UserCard
        name="田中太郎"
        age={28}
        role="editor"
        skills={["React", "TypeScript"]}
      />
    );
    expect(screen.getByTestId("name")).toHaveTextContent("田中太郎");
    expect(screen.getByTestId("age")).toHaveTextContent("年齢: 28");
    expect(screen.getByTestId("role")).toHaveTextContent("権限: 編集者");
    expect(screen.queryByTestId("email")).toBeNull();
    expect(screen.queryByTestId("contact-btn")).toBeNull();
    expect(screen.getByTestId("skills").children).toHaveLength(2);
  });

  test("email が渡された場合に表示される", () => {
    render(
      <UserCard
        name="佐藤花子"
        age={32}
        role="admin"
        email="hanako@example.com"
        skills={["Node.js"]}
      />
    );
    expect(screen.getByTestId("email")).toHaveTextContent(
      "Email: hanako@example.com"
    );
  });

  test("onContact が email と共に呼び出される", () => {
    const handleContact = vi.fn();
    render(
      <UserCard
        name="鈴木一郎"
        age={45}
        role="viewer"
        email="ichiro@example.com"
        skills={["Go", "Rust", "Python"]}
        onContact={handleContact}
      />
    );
    fireEvent.click(screen.getByTestId("contact-btn"));
    expect(handleContact).toHaveBeenCalledWith("ichiro@example.com");
  });

  test("role ごとに正しい日本語ラベルが表示される", () => {
    const cases: Array<{ role: "admin" | "editor" | "viewer"; label: string }> = [
      { role: "admin", label: "管理者" },
      { role: "editor", label: "編集者" },
      { role: "viewer", label: "閲覧者" },
    ];
    cases.forEach(({ role, label }) => {
      const { unmount } = render(
        <UserCard name="test" age={20} role={role} skills={[]} />
      );
      expect(screen.getByTestId("role")).toHaveTextContent(`権限: ${label}`);
      unmount();
    });
  });
});