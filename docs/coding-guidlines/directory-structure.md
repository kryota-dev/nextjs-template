<!-- LLMへの指示: このファイルが読み込まれたら「directory-structure.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# ディレクトリ構成

以下のディレクトリ構造に従って実装を行ってください：

```
/
├── .cursor/                            # Cursor設定
├── .github/                            # GitHub設定
│   ├── actions/                        # GitHub Actionsの複合アクション
│   ├── ISSUE_TEMPLATE/                 # GitHub Issueのテンプレート
│   └── workflows/                      # GitHub Actionsのワークフロー
├── .next/                              # Next.jsのキャッシュ
├── .storybook/                         # Storybookの設定
├── .vscode/                            # VSCodeの設定
├── docs/                               # ドキュメント
├── node_modules/                       # 依存パッケージ
├── out/                                # Next.jsのビルド出力
├── public/                             # 静的ファイル
├── scripts/                            # スクリプト
├── src/                                # ソースコード
│   ├── app/                            # Next.jsのアプリケーションディレクトリ
│   ├── components/                     # アプリケーションコンポーネント
│   │   ├── common/                     # 共通コンポーネント
│   │   └── layouts/                    # レイアウト関連
│   ├── constants/                      # 定数
│   ├── images/                         # 画像
│   ├── libs/                           # ライブラリ実装のラッパー関数
│   ├── styles/                         # グローバルスタイル（フォント設定も含む）
│   └── utils/                          # ユーティリティ関数
├── .env.example                        # 環境変数のサンプルファイル
├── .git                                # Gitリポジトリ
├── .gitignore                          # Git除外設定
├── .npmrc                              # pnpmの設定
├── .prettierignore                     # Prettierの除外設定
├── cspell.config.yml                   # cspellの設定
├── eslint.config.ts                    # ESLintの設定
├── lefthook.yaml                       # Lefthookの設定
├── markuplint.config.ts                # Markuplintの設定
├── next-env.d.ts                       # Next.jsの型定義
├── next.config.ts                      # Next.jsの設定
├── package.json                        # プロジェクト設定
├── pnpm-lock.yaml                      # 依存関係ロックファイル
├── postcss.config.mjs                  # PostCSSの設定
├── prettier.config.mjs                 # Prettierの設定
└── tsconfig.json                       # TypeScriptの設定
```
