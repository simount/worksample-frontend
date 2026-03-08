import React, { useState, useEffect } from "react";

/**
 * ===================================================
 * Q2: useState / useEffect の基本（制限時間 15分 / 配点 25点）
 * ===================================================
 *
 * TODO: UserList コンポーネントを実装してください
 *
 * 要件:
 * 1. コンポーネントのマウント時に fetchUsers() を呼び出してユーザー一覧を取得
 * 2. ローディング中: <p data-testid="loading">読み込み中...</p>
 * 3. エラー時: <p data-testid="error">エラーが発生しました</p>
 * 4. 成功時:
 *    <ul data-testid="user-list">
 *      <li data-testid={`user-${user.id}`}>{user.name} - {user.department}</li>
 *    </ul>
 * 5. ユーザー 0件: <p data-testid="empty">ユーザーがいません</p>
 *
 * ヒント:
 * - 3つの状態（loading, error, data）を管理してください
 * - useEffect 内で async 関数を使う場合、直接 async にはできません
 */

export interface User {
  id: number;
  name: string;
  department: string;
}

// ※ この関数は変更しないでください
export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// ↓↓↓ ここに UserList コンポーネントを実装してください ↓↓↓

// 3つの状態
type State = 
| { status: "loading" }
| { status: "error" }
| { status: "success"; data: User[]};


export const UserList: React.FC = () => {
  // TODO: 実装してください
  const [state, setState] = useState<State>({status: "loading"});

  useEffect(() => {
    const load = async () => {
      try {
        const users = await fetchUsers();
        setState({status: "success", data: users});
      } catch {
        setState({status: "error"});
      }
    };

    load();
  }, []);

  if(state.status === "loading") {
    return <p data-testid="loading">読み込み中...</p>
  }

  if(state.status === "error") {
    return <p data-testid="error">エラーが発生しました</p>
  }

  if(state.data.length === 0 ){
    return <p data-testid="empty">ユーザーがいません</p>
  }

  return (
    <ul data-testid="user-list">
      {state.data.map((user) => (
        <li key={user.id} data-testid={`user-${user.id}`}>{user.name} - {user.department}</li>
      ))}
    </ul>
  );
};

// ↑↑↑ ここまで ↑↑↑
