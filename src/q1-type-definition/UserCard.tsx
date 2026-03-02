import React from "react";

/**
 * ===================================================
 * Q1: 型定義（制限時間 15分 / 配点 25点）
 * ===================================================
 *
 * TODO: UserCardProps 型を定義し、UserCard コンポーネントを実装してください
 *
 * Props の要件:
 * - name: 文字列（必須）
 * - age: 数値（必須）
 * - email: 文字列（任意）
 * - role: "admin" | "editor" | "viewer" のいずれか（必須）
 * - skills: 文字列の配列（必須）
 * - onContact: email を引数に取るコールバック関数（任意）
 *   ※ email が Props に存在する場合のみ呼び出される想定
 *
 * コンポーネントの要件:
 * - <h2 data-testid="name"> に name を表示
 * - <p data-testid="age"> に "年齢: {age}" を表示
 * - <p data-testid="role"> に "権限: {ロール日本語名}" を表示
 *   （admin→管理者, editor→編集者, viewer→閲覧者）
 * - email がある場合のみ <p data-testid="email"> に "Email: {email}" を表示
 * - <ul data-testid="skills"> 内に skills を <li> で表示
 * - email と onContact が両方ある場合のみ
 *   <button data-testid="contact-btn"> を表示し、
 *   クリック時に onContact(email) を呼び出す
 *
 * ヒント:
 * - TypeScript のユニオン型（Union Types）を使ってください
 * - 任意の Props には ? を使ってください
 */

// ↓↓↓ ここに UserCardProps 型の定義と UserCard コンポーネントを実装してください ↓↓↓
type UserCardProps = {
  name: string;
  age: number;
  email?: string;
  role: "admin" | "editor" | "viewer";
  skills: string[];
  onContact?: (email: string) => void;
};
const roleLabel = { admin: "管理者", editor: "編集者", viewer: "閲覧者", } as const;
export const UserCard = (props: UserCardProps) => {
  return (
    <div>
      <h2 data-testid="name">{props.name}</h2>
      <p data-testid="age">年齢: {props.age}</p>
      <p data-testid="role">権限: {roleLabel[props.role]}</p>
      {props.email && ( <p data-testid="email">Email: {props.email}</p> )}
      <ul data-testid="skills"> {props.skills.map((skill) => ( <li key={skill}>{skill}</li> ))} </ul>
      {props.email && props.onContact && ( <button data-testid="contact-btn" onClick={() => props.onContact!(props.email!)}> Contact </button> )}
    </div>
  );
};
// ↑↑↑ ここまで ↑↑↑
