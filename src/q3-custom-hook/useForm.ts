import { useState, useCallback } from "react";

/**
 * ===================================================
 * Q3: カスタムフック（制限時間 30分 / 配点 25点）
 * ===================================================
 *
 * TODO: useForm カスタムフックを実装してください
 *
 * 要件:
 * 1. values: 現在のフォーム値を保持
 * 2. errors: 各フィールドの最初のエラーメッセージを保持（エラーがなければキーなし）
 * 3. touched: ユーザーが触れたフィールドを記録
 * 4. setValue(field, value):
 *    - 指定フィールドの値を更新する
 *    - そのフィールドが touched なら、そのフィールドのみバリデーションを実行
 * 5. setTouched(field):
 *    - 指定フィールドを touched にする
 *    - そのフィールドのバリデーションを実行
 * 6. validate():
 *    - 全フィールドのバリデーションを実行
 *    - エラーがなければ true を返す
 * 7. reset():
 *    - values, errors, touched を初期状態に戻す
 * 8. isValid: 現在の errors が空かどうか（boolean）
 *
 * バリデーションロジック:
 * - 各フィールドに対して rules 配列を順番に実行
 * - 最初に null でない値（エラーメッセージ）を返したルールの結果を errors にセット
 * - 全ルールが null を返した場合、そのフィールドの errors エントリを削除
 *
 * ヒント:
 * - ジェネリクス <T extends Record<string, any>> を使ってください
 * - useState を複数使って values, errors, touched を管理してください
 */

export type ValidationRules<T> = {
  [K in keyof T]?: Array<(value: T[K]) => string | null>;
};

export interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setTouched: (field: keyof T) => void;
  validate: () => boolean;
  reset: () => void;
  isValid: boolean;
}

// ↓↓↓ ここに useForm を実装してください ↓↓↓

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  rules: ValidationRules<T> = {}
): UseFormReturn<T> {
  // TODO: 実装してください
  throw new Error("Not implemented");
}

// ↑↑↑ ここまで ↑↑↑
