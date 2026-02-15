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

export const UserCard = () => {
  // TODO: 実装してください
  return null;
};

// ↑↑↑ ここまで ↑↑↑
