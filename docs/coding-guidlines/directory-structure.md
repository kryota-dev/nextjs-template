<!-- LLMへの指示: このファイルが読み込まれたら「docs/coding-guidlines/directory-structure.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# ディレクトリ構成

以下のディレクトリ構造に従って実装を行ってください：

```
/
├── .cursor/                                                                 # Cursor設定
├── .github/                                                                 # GitHub設定
│   ├── actions/                                                             # GitHub Actionsの複合アクション
│   ├── ISSUE_TEMPLATE/                                                      # GitHub Issueのテンプレート
│   └── workflows/                                                           # GitHub Actionsのワークフロー
│       ├── automated-release.yml                                            # 自動リリースワークフロー
│       ├── add-github-labels.yml                                            # ラベル管理
│       ├── check-quality.yml                                                # コード品質チェック
│       └── chromatic.yml                                                    # ビジュアルテスト
├── .next/                                                                   # Next.jsのキャッシュ
├── .plop/                                                                   # Plopテンプレートファイル
├── .storybook/                                                              # Storybookの設定
├── .vscode/                                                                 # VSCodeの設定
├── docs/                                                                    # ドキュメント
├── node_modules/                                                            # 依存パッケージ
├── out/                                                                     # Next.jsのビルド出力
├── public/                                                                  # 静的ファイル
├── scripts/                                                                 # スクリプト
├── src/                                                                     # ソースコード
│   ├── app/                                                                 # Next.jsのアプリケーションディレクトリ
│   │   ├── [route]/                                                         # 各ルートディレクトリ
│   │   │   ├── page.tsx                                                     # ページコンポーネント
│   │   │   ├── layout.tsx                                                   # レイアウトコンポーネント（オプション）
│   │   │   └── _containers/                                                 # Container/Presentationalパターン
│   │   │       ├── page/                                                    # ページ用Container/Presentation
│   │   │       │   ├── container.tsx                                        # ページContainerコンポーネント
│   │   │       │   ├── index.ts                                            # エクスポートファイル
│   │   │       │   └── presentation/                                        # Presentationコンポーネント
│   │   │       │       ├── presentation.tsx                                 # Presentationコンポーネント本体
│   │   │       │       ├── presentation.stories.tsx                         # Storybookファイル
│   │   │       │       └── index.ts                                         # エクスポートファイル
│   │   │       └── layout/                                                  # レイアウト用Container/Presentation（オプション）
│   │   │           ├── container.tsx                                        # レイアウトContainerコンポーネント
│   │   │           ├── index.ts                                             # エクスポートファイル
│   │   │           └── presentation/                                        # Presentationコンポーネント
│   │   │               ├── _components/                                     # Presentation内でのみ使用するコンポーネント
│   │   │               │   └── [ComponentName]/                             # コンポーネント本体
│   │   │               │       ├── [ComponentName].tsx                      # コンポーネント本体
│   │   │               │       ├── [ComponentName].stories.tsx             # Storybookファイル
│   │   │               │       └── index.ts                                 # エクスポートファイル
│   │   └── _components/                                                     # app直下のページ用コンポーネント
│   ├── components/                                                          # アプリケーションコンポーネント
│   │   ├── common/                                                          # 共通コンポーネント
│   │   └── layouts/                                                         # レイアウト関連
│   ├── constants/                                                           # 定数
│   ├── images/                                                              # 画像
│   ├── libs/                                                                # ライブラリ実装のラッパー関数
│   ├── styles/                                                              # グローバルスタイル（フォント設定も含む）
│   └── utils/                                                               # ユーティリティ関数
├── .env.example                                                             # 環境変数のサンプルファイル
├── .git                                                                     # Gitリポジトリ
├── .gitignore                                                               # Git除外設定
├── .node-version                                                            # Node.jsのバージョン
├── .npmrc                                                                   # pnpmの設定
├── .prettierignore                                                          # Prettierの除外設定
├── cspell.config.yml                                                        # cspellの設定
├── eslint.config.ts                                                         # ESLintの設定
├── lefthook.yaml                                                            # Lefthookの設定
├── markuplint.config.ts                                                     # Markuplintの設定
├── next-env.d.ts                                                            # Next.jsの型定義
├── next.config.ts                                                           # Next.jsの設定
├── package.json                                                             # プロジェクト設定
├── plopfile.mjs                                                             # Plopの設定
├── pnpm-lock.yaml                                                           # 依存関係ロックファイル
├── postcss.config.mjs                                                       # PostCSSの設定
├── prettier.config.mjs                                                      # Prettierの設定
├── tsconfig.json                                                            # TypeScriptの設定
├── vitest.config.ts                                                         # Vitestの設定
└── vitest.setup.ts                                                          # Vitestのセットアップ

## Container/Presentationalパターンについて

このプロジェクトでは、App Routerのページとレイアウトで**Container/Presentationalパターン**を採用しています：

### 構造の説明

- **page.tsx/layout.tsx**: Next.jsのルーティングエントリーポイント。対応するContainerコンポーネントを呼び出すのみ
- **_containers/**: Container/Presentationalパターンのファイル群を格納
  - **container.tsx**: データ取得やロジック処理を行うコンテナコンポーネント
  - **presentation/**: UI表示に特化したプレゼンテーションコンポーネント
    - **presentation.tsx**: UIコンポーネント本体
    - **presentation.stories.tsx**: Storybookファイル（UI確認用）

### 利点

- **関心の分離**: データ取得とUI表示が明確に分離される
- **テスタビリティ**: Presentationコンポーネントは純粋なUIコンポーネントとしてテストしやすい
- **再利用性**: Presentationコンポーネントは他の場所でも再利用可能
- **Storybook対応**: UI確認がしやすい構造

### 命名規則

- Container: `[ComponentName]Container` (例: `AboutPageContainer`)
- Presentation: `[ComponentName]Presentation` (例: `AboutPagePresentation`)
