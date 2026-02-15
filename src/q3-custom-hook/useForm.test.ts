// ⚠️ このファイルは編集しないでください
import { renderHook, act } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { useForm } from "./useForm";

interface LoginForm {
  email: string;
  password: string;
}

const initialValues: LoginForm = { email: "", password: "" };

const rules = {
  email: [
    (v: string) => (!v ? "メールアドレスは必須です" : null),
    (v: string) => (!v.includes("@") ? "無効なメールアドレスです" : null),
  ],
  password: [
    (v: string) => (!v ? "パスワードは必須です" : null),
    (v: string) => (v.length < 8 ? "8文字以上で入力してください" : null),
  ],
};

describe("Q3: useForm カスタムフック", () => {
  test("初期値が正しくセットされる", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    expect(result.current.values).toEqual({ email: "", password: "" });
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  test("setValue で値が更新される", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => { result.current.setValue("email", "test@example.com"); });
    expect(result.current.values.email).toBe("test@example.com");
  });

  test("setTouched でフィールドが touched になり、バリデーションが実行される", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => { result.current.setTouched("email"); });
    expect(result.current.touched.email).toBe(true);
    expect(result.current.errors.email).toBe("メールアドレスは必須です");
  });

  test("touched なフィールドは setValue 時にバリデーションが実行される", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => { result.current.setTouched("email"); });
    expect(result.current.errors.email).toBe("メールアドレスは必須です");

    act(() => { result.current.setValue("email", "invalid"); });
    expect(result.current.errors.email).toBe("無効なメールアドレスです");

    act(() => { result.current.setValue("email", "test@example.com"); });
    expect(result.current.errors.email).toBeUndefined();
  });

  test("未 touched のフィールドは setValue 時にバリデーションされない", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => { result.current.setValue("email", "invalid"); });
    expect(result.current.errors.email).toBeUndefined();
  });

  test("validate() で全フィールドのバリデーションが実行される", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    let isValid: boolean;
    act(() => { isValid = result.current.validate(); });
    expect(isValid!).toBe(false);
    expect(result.current.errors.email).toBe("メールアドレスは必須です");
    expect(result.current.errors.password).toBe("パスワードは必須です");
    expect(result.current.isValid).toBe(false);
  });

  test("全フィールドが正しい場合 validate() は true を返す", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => {
      result.current.setValue("email", "test@example.com");
      result.current.setValue("password", "securepassword");
    });
    let isValid: boolean;
    act(() => { isValid = result.current.validate(); });
    expect(isValid!).toBe(true);
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  test("reset() で全状態が初期化される", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => {
      result.current.setValue("email", "test@example.com");
      result.current.setTouched("email");
      result.current.validate();
    });
    act(() => { result.current.reset(); });
    expect(result.current.values).toEqual({ email: "", password: "" });
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isValid).toBe(true);
  });

  test("バリデーションルールは最初のエラーのみ返す", () => {
    const { result } = renderHook(() => useForm(initialValues, rules));
    act(() => { result.current.setTouched("password"); });
    expect(result.current.errors.password).toBe("パスワードは必須です");

    act(() => { result.current.setValue("password", "short"); });
    expect(result.current.errors.password).toBe("8文字以上で入力してください");
  });
});
