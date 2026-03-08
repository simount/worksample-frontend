---
name: grade-pr
description: PRを採点し、結果をローカル保存してコメントを投稿する。ワークサンプルの採点時に使用。
argument-hint: [pr-number]
---

PR #$ARGUMENTS を以下の手順で採点してください。

## 1. 情報収集

以下を並列で取得する:

- `gh pr view $ARGUMENTS --json title,author,body,headRefName,files,url` で PR の基本情報を取得
- `gh pr diff $ARGUMENTS` で差分を取得

## 2. テスト改ざんチェック

- `gh pr checkout $ARGUMENTS --force` で PR のブランチをチェックアウト
- `git diff origin/main -- "*.test.tsx" "*.test.ts"` でテストファイルの改ざんがないか確認
- 改ざんがあれば即不合格とし、以降の採点は行わない

## 3. テスト実行

- `npm run test:verbose` でテストを実行
- 全テスト (Q1〜Q4) の合否を記録

## 4. 採点基準（100点満点）

### テスト通過（70点）

| 問題 | テスト数 | 配点 |
|------|---------|------|
| Q1: UserCard 型定義 + コンポーネント実装 | 4 | 20点 |
| Q2: UserList (useState/useEffect) | 4 | 20点 |
| Q3: useForm カスタムフック | 9 | 15点 |
| Q4: TaskManager リファクタリング | 8 | 15点 |

テストが部分的に通過した場合は、通過率に応じて按分する。

### コードレビュー（30点）

| 観点 | 配点 | 評価ポイント |
|------|------|-------------|
| 型設計の質 | 5点 | Union型、Record型、optional の使い分け、型アサーションの回避、Discriminated Union 等 |
| コードの明瞭さ | 5点 | 状態遷移の明確さ、async/await パターン、クリーンアップ、フォーマット統一 |
| ジェネリクスの活用 | 10点 | useForm のジェネリクス設計、useCallback の活用、stale closure 回避、バリデーションロジック |
| 設計判断 | 10点 | コンポーネント分割の責務、状態管理の集約、Props 設計、重複排除、型定義の分離 |

### 合格ライン: 60点

## 5. 採点結果をローカル保存

`grading/pr{番号}-{GitHubユーザー名}-{氏名}.md` に以下の形式で保存:

```markdown
# PR #{番号} 採点結果 — {氏名} (@{GitHubユーザー名})

## 基本情報
- PR: {URL}
- 受験者: {氏名} (@{GitHubユーザー名})
- 採点日: {YYYY-MM-DD}

## テスト改ざんチェック
`git diff origin/main -- "*.test.tsx" "*.test.ts"` → 差分なし（改ざんなし） or 改ざんあり

## テスト通過状況
- Q1: X/4 テスト通過（Y点）
- Q2: X/4 テスト通過（Y点）
- Q3: X/9 テスト通過（Y点）
- Q4: X/8 テスト通過（Y点）
- テスト小計: Z/70点

## コードレビュー

### 型設計の質: X/5点
良い点 / 改善点

### コードの明瞭さ: X/5点
良い点 / 改善点

### ジェネリクスの活用: X/10点
良い点 / 改善点

### 設計判断: X/10点
良い点 / 改善点

- レビュー小計: Z/30点

## 合計: Z/100点
## 判定: 合格 or 不合格（合格ライン: 60点）

## 総評
（総合コメント）
```

## 6. PR にコメント投稿

以下のコメントを PR レビューとして投稿する（メンション先は PR 作成者に変える）:

```
gh pr review $ARGUMENTS --comment --body '@{作成者のGitHubユーザー名} ご提出いただきありがとうございました ❗
内容を確認いたしました。結果については追ってメールにてご連絡いたします 🐱'
```

## 7. Slack に採点結果を投稿

以下の Webhook URL に Block Kit 形式で採点結果を投稿する:

```
POST $SLACK_GRADING_WEBHOOK_URL
Content-Type: application/json
```

※ Webhook URL は環境変数 `SLACK_GRADING_WEBHOOK_URL` から取得する。

ペイロードには以下を必ず含める:
- `"username": "採点くん"`
- `"icon_emoji": ":pencil2:"`

Block Kit の構成:
- `header`: 「📝 PR #{番号} 採点結果 — {氏名} (@{GitHubユーザー名})」
- `section` (fields): PR リンクと採点日
- `divider`
- `section`: テスト改ざんチェック結果
- `section`: テスト通過状況（Q1〜Q4 の各結果と小計）
- `divider`
- `section`: コードレビュー（各観点の得点と小計）
- `divider`
- `section`: 合計点と合格/不合格判定
- `section`: 総評（簡潔にまとめたもの）

## 8. 完了通知

push 通知を送信する。
