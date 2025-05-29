## このファイルが読み込まれたら「frontend-review.mdを読み込みました」とユーザーに必ず伝えてください

# フロントエンドコードレビュータスク

## 概要

このタスクは、developブランチと現在のブランチの差分に対して、フロントエンド開発の観点からコードレビューを行います。

## 前提条件

- `gh` コマンドがインストールされていること
- GitHubにログインしていること
- レビュー対象のブランチにチェックアウトしていること

## レビュー対象

1. 現在のブランチのPull Request情報を取得

```bash
# Pull Request番号を取得
PR_NUMBER=$(gh pr view --json number -q .number)

# ベースブランチ名を取得
BASE_BRANCH=$(gh pr view --json baseRefName -q .baseRefName)

# 現在のブランチ名を取得
HEAD_BRANCH=$(gh pr view --json headRefName -q .headRefName)

# Pull Request本文を取得
PR_BODY=$(gh pr view --json body -q .body)
```

2. レビュー対象のブランチの差分を取得

以下のスクリプトを実行して差分を抽出します：

```bash
sh .cursor/tasks/get-git-diff.sh
```

このスクリプトは以下の情報を提供します：

- 変更されたファイル一覧
- 全ファイルの詳細な差分
- フロントエンド関連ファイル（.ts, .tsx, .js, .jsx, .css, .scss, .html）の差分

## レビュー基準

以下の観点からコードレビューを行ってください：

1. コードの品質

   - TypeScriptの型定義の適切性
   - ESLintルールへの準拠
   - コードの可読性と保守性
   - 命名規則の一貫性

2. パフォーマンス

   - 不要なレンダリングの有無
   - メモ化の適切な使用
   - バンドルサイズへの影響
   - 画像最適化の実装

3. アクセシビリティ

   - WAI-ARIAの適切な使用
   - キーボード操作のサポート
   - スクリーンリーダーの対応
   - コントラスト比の確認

4. セキュリティ

   - クライアントサイドのセキュリティ対策
   - 適切なバリデーション
   - 機密情報の扱い

5. コンポーネント設計
   - コンポーネントの責務の明確さ
   - props/stateの適切な使用
   - 再利用性と拡張性
   - カスタムフックの実装

## レビュー結果の出力形式

レビュー結果は以下の形式で、`.cursor/reviews/review-${PR_NUMBER}.md`に出力してください：

```markdown
## レビュー概要

- レビュー対象ファイル数: X
- 重要度の高い指摘: X件
- 改善提案: X件

## 詳細レビュー

### [ファイルパス]

- 🚨 重要な指摘

  - 内容
  - 改善案

- ✨ 改善提案
  - 内容
  - 提案内容

### ベストプラクティス

- 良い実装例の紹介
- 推奨パターンの提案
```

## レビュー結果を開く

以下のコマンドを実行してレビュー結果を開いてください：

```bash
open .cursor/reviews/review-${PR_NUMBER}.md
```

## レビュー結果をGitHubに反映する

ユーザーに、レビュー結果をGitHubに反映するかどうかを確認してください。
ユーザーからの同意が得られたら、以下のコマンドを実行してレビュー結果をGitHubに反映してください：

```bash
gh pr comment ${PR_NUMBER} --body-file .cursor/reviews/review-${PR_NUMBER}.md
```

## レビュー完了の通知

全て完了したら、afplayで音を鳴らしてください。

```bash
afplay /System/Library/PrivateFrameworks/ToneLibrary.framework/Versions/A/Resources/AlertTones/Classic/Glass.m4r
```

## 注意事項

- プロジェクトの設定ファイル（ESLint, Prettier, TypeScript等）の内容を考慮してレビューを行ってください
- Next.jsのベストプラクティスに基づいた提案を行ってください
- パフォーマンスとアクセシビリティを重視したレビューを心がけてください
