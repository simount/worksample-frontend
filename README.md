# React / TypeScript コーディング試験

## 概要

| 項目 | 内容 |
|------|------|
| 制限時間 | ありません |
| 配点 | 100点（各問 25点） |
| 合格ライン | 60点 |

## 問題一覧

| 問題 | テーマ | 編集対象ファイル |
|------|--------|---------|
| Q1 | Props の型定義 | `src/q1-type-definition/UserCard.tsx` |
| Q2 | useState / useEffect | `src/q2-hooks-basics/UserList.tsx` |
| Q3 | カスタムフック | `src/q3-custom-hook/useForm.ts` |
| Q4 | コンポーネント分割 | `src/q4-refactor/` 配下（後述） |

### Q4 の編集対象ファイル

`TaskManager.original.tsx`（参考・読み取り専用）を元に、以下のファイルを実装してください。

- `src/q4-refactor/types.ts`
- `src/q4-refactor/components/TaskForm.tsx`
- `src/q4-refactor/components/TaskFilter.tsx`
- `src/q4-refactor/components/TaskItem.tsx`
- `src/q4-refactor/components/TaskList.tsx`
- `src/q4-refactor/TaskManager.tsx`

## ルール

- 各ファイルの `TODO` コメントに従って実装してください
- `*.test.tsx` / `*.test.ts` ファイルは **編集禁止** です
- 外部ライブラリの追加は禁止です（React 標準の機能のみ使用可）
- AI ツール（ChatGPT, GitHub Copilot 等）の使用は禁止です

---

## 受験の流れ

### STEP 1: 環境構築

#### 必要なもの

- Node.js 18 以上
- npm
- Git
- GitHub アカウント（お持ちでない方は [こちら](https://github.com/signup) から作成してください）

#### リポジトリのフォークとクローン

1. このリポジトリ右上の **「Fork」** ボタンをクリック
   - 自分のアカウントにコピーが作成されます
2. フォークしたリポジトリをクローン:

```bash
git clone https://github.com/<あなたのユーザー名>/worksample-frontend.git
cd worksample-frontend
```

3. 依存パッケージをインストール:

```bash
npm install
```

4. テストが実行できることを確認:

```bash
npm test
```

> 全テストが FAIL になれば正常です（まだ実装していないため）。

### STEP 2: 実装

- 各問題の対象ファイルを開き、`TODO` コメントに従って実装してください
- 問題ごとにコミットすることを推奨します:

```bash
# 例: Q1 完了時
git add .
git commit -m "Q1: UserCardProps 型定義を実装"
```

### STEP 3: テストで自己採点

```bash
npm test              # 全テスト実行
npm run test:verbose  # 詳細表示
```

### STEP 4: 提出（Pull Request）

1. 実装内容を push:

```bash
git push origin main
```

2. GitHub 上でフォーク元のリポジトリに **Pull Request** を作成:
   - フォークしたリポジトリのページを開く
   - **「Contribute」→「Open pull request」** をクリック
   - PR タイトル: `【受験】氏名`（例: `【受験】田中太郎`）
   - PR 本文に以下を記載:
     - 氏名
     - `npm run test:verbose` の実行結果（コピー＆ペースト）
     - 実装で工夫した点や苦労した点（任意）

3. PR を作成したら完了です。お疲れ様でした！

---

## FAQ

**Q: テストが通らないが、実装は正しいと思う**  
A: `data-testid` の値がテストの期待値と一致しているか確認してください。テストファイル内のアサーションが求める構造を参考にしてください。

**Q: Q4 はどこまで分割すればいい？**  
A: テストファイルで `import("./components/TaskForm")` 等をチェックしているため、指定された4つのコンポーネントファイルは必ず作成してください。
