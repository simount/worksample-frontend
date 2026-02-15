// ⚠️ このファイルは編集しないでください
import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { UserList } from "./UserList";

const mockFetch = (data: any, ok = true) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok,
    json: () => Promise.resolve(data),
  });
};

const mockFetchError = () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: false });
};

describe("Q2: UserList", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("ローディング中に「読み込み中...」が表示される", () => {
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {}));
    render(<UserList />);
    expect(screen.getByTestId("loading")).toHaveTextContent("読み込み中...");
  });

  test("取得成功時にユーザー一覧が表示される", async () => {
    const users = [
      { id: 1, name: "田中", department: "開発部" },
      { id: 2, name: "佐藤", department: "営業部" },
    ];
    mockFetch(users);
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("user-list")).toBeInTheDocument();
    });
    expect(screen.getByTestId("user-1")).toHaveTextContent("田中 - 開発部");
    expect(screen.getByTestId("user-2")).toHaveTextContent("佐藤 - 営業部");
  });

  test("ユーザーが0件の場合に「ユーザーがいません」が表示される", async () => {
    mockFetch([]);
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("empty")).toHaveTextContent(
        "ユーザーがいません"
      );
    });
  });

  test("取得失敗時にエラーメッセージが表示される", async () => {
    mockFetchError();
    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "エラーが発生しました"
      );
    });
  });
});
