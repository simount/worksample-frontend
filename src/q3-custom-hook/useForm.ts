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
  const [values, setValues] = useState<T> ({...initialValues});
  const [errors, setErrors] = useState<Partial<Record<keyof T,string>>> ({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>> ({});


  const validateField = useCallback(
    <K extends keyof T>(field: K, currentValues: T): string | null => {
      const fieldRules = rules[field];
      if(!fieldRules || fieldRules.length === 0) return null;

      for(const rule of fieldRules){
        const result = rule(currentValues[field]);
        if(result != null) return result;
      }
      return null;
    },
    [rules] 
  );


  const applyFieldError = useCallback(
    (
      prev: Partial<Record<keyof T, string>>,
      field: keyof T,
      error: string | null
    ): Partial<Record<keyof T, string>> => {
      const next = { ...prev };
      if(error != null ){
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    },
    []
  );


  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
        setValues((prev) => ({ ...prev, [field]: value}));

        if(touched[field]) {
          const error = validateField(field, {[field]: value} as T);
          setErrors((prev) => applyFieldError(prev, field, error));
        }
   },
    [touched, validateField, applyFieldError]
  );


  const setTouched = useCallback(
    <K extends keyof T>(field: K) => {
      setTouchedState((prev) => ({...prev, [field]: true }));

      const error = validateField(field, values);
      setErrors((prev) => applyFieldError(prev,field, error));
    },
    [values, validateField, applyFieldError]
  );

 
  const validate = useCallback((): boolean =>  {
      const allFileds = Object.keys(rules) as (keyof T)[];
      let nextErrors: Partial<Record<keyof T, string>> = {};

      for(const field of allFileds){
        const error = validateField(field, values);
        if(error != null) {
          nextErrors[field] = error;
        }
      }

      setErrors(nextErrors);
      return Object.keys(nextErrors).length ===0;
    },
    [rules, values, validateField]
  );


  const reset = useCallback(() =>{
    setValues({...initialValues});
    setErrors({});
    setTouchedState({}); 
    },
    [initialValues]
  );

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
