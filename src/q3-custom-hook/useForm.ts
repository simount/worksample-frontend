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
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({});
  const validateField = <K extends keyof T>(field: K, value: T[K]): string | null => {
    const fieldRules = rules[field];
    if (!fieldRules) return null;
    for (const rule of fieldRules) {
      const msg = rule(value);
      if (msg !== null) return msg;
    }
    return null;
  };
  const applyFieldError = <K extends keyof T>(field: K, msg: string | null) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[field] = msg;
      else delete next[field];
      return next;
    });
  };
  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (touched[field]) {
        const msg = validateField(field, value);
        applyFieldError(field, msg);
      }
      return next;
    });
  };
  const setTouched = (field: keyof T) => {
    setTouchedState((prev) => ({ ...prev, [field]: true }));
    const msg = validateField(field as keyof T, values[field]);
    applyFieldError(field as keyof T, msg);
  };
  const validate = () => {
    const nextErrors: Partial<Record<keyof T, string>> = {};
    (Object.keys(values) as (keyof T)[]).forEach((field) => {
      const msg = validateField(field, values[field]);
      if (msg) nextErrors[field] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouchedState({});
  };
  const isValid = Object.keys(errors).length === 0;
  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validate,
    reset,
    isValid,
  };
}
// ↑↑↑ ここまで ↑↑↑
