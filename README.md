# Next.js Static Export Boilerplate

このプロジェクトは、Next.js App Routerを使用した最新のWeb開発のための包括的なボイラープレートです。  
TypeScript、Tailwind CSS、Storybook、および様々な品質保証ツールが組み込まれています。

## Tech Stack

プロジェクトで使用している主な技術は以下の通りです。
詳細な技術スタックについては[こちら](docs/coding-guidlines/technology-stack.md)を参照してください。

- Next.js
- React
- TypeScript
- Tailwind CSS
- Storybook

## Getting Started

### Environment Variables

プロジェクトで使用する環境変数を設定してください：

```bash
# .envファイルを作成
cp .env.example .env
```

### Installation

```bash
# pnpm使用推奨
pnpm install
```

### Development Server

```bash
# Next.js開発サーバー
pnpm dev:next

# Storybook
pnpm dev:storybook

# または全て同時に起動
pnpm dev
```

| ポート | 説明                  |
| ------ | --------------------- |
| 3000   | Next.js開発サーバー   |
| 6006   | Storybook開発サーバー |

### Build

```bash
# Next.jsのビルド
pnpm build:next

# Storybookのビルド
pnpm build:storybook

# または全て同時にビルド
pnpm build
```

### Preview

```bash
# Next.jsのビルドをプレビュー
pnpm start:next

# Storybookのビルドをプレビュー
pnpm start:storybook

# または全て同時にプレビュー
pnpm start
```

| ポート | 説明                        |
| ------ | --------------------------- |
| 8000   | Next.jsのビルドプレビュー   |
| 6008   | Storybookのビルドプレビュー |

## Code Quality

このプロジェクトには多数のコード品質ツールが組み込まれています：

```bash
# リントチェック
pnpm lint:check
# リントチェック（自動修正）
pnpm lint:fix

# マークアップチェック
pnpm markuplint:check
# マークアップチェック（自動修正）
pnpm markuplint:fix

# フォーマットチェック
pnpm format:check
# フォーマットチェック（自動修正）
pnpm format:fix

# 型チェック
pnpm typecheck

# スペルチェック
pnpm spellcheck

# 全てのチェックを実行
pnpm quality:check
# 自動修正を適用
pnpm quality:fix
```

Git commit時にはlefthookによる自動チェックが行われます。

## Test

このプロジェクトでは、以下のテストが実行できます：

```bash
# ユニットテスト
pnpm test:unit

# ユニットテストのカバレッジ
pnpm test:unit-coverage

# ユニットテストのブラウザUI
pnpm test:unit-ui
```

## Project Structure

プロジェクトのディレクトリ構造の詳細については[ディレクトリ構造](docs/coding-guidlines/directory-structure.md)を参照してください。

## Documentation

このプロジェクトには以下の詳細なドキュメントが用意されています：

- [技術スタック](docs/coding-guidlines/technology-stack.md) - 使用している技術とバージョン情報
- [ディレクトリ構造](docs/coding-guidlines/directory-structure.md) - プロジェクトのファイル構成
- [コーディング規約](docs/coding-guidlines/coding-rule.md) - 開発時の規約とガイドライン
- [リリースプロセス](docs/coding-guidlines/release-process.md) - 自動リリースとバージョニングの仕組み

## DeepWiki

このプロジェクトのより詳細な情報、FAQ、ベストプラクティスについては、DeepWiki をご覧ください。

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/kryota-dev/nextjs-static-export-template)

## Release Process

このプロジェクトでは、カレンダーバージョニング（YYYY.MM.DD形式）を使用した自動リリースシステムを採用しています。

詳細なリリースプロセスについては[リリースプロセス](docs/coding-guidlines/release-process.md)を参照してください。

## Deployment

このプロジェクトはStatic Exportを使用してデプロイできます。

Static Exportの詳細については、[Next.jsのドキュメント](https://nextjs.org/docs/app/guides/static-exports)を参照してください。

## License

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
