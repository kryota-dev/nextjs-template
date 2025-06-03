# Plop コードジェネレーター

このプロジェクトでは、[Plop](https://plopjs.com/)を使ってReactコンポーネントやNext.js App Routerのページ・レイアウトを効率的に生成できます。

## 利用可能なジェネレーター

### 1. component - Reactコンポーネント生成

Reactコンポーネント一式（コンポーネント本体、テストファイル、Storybookファイル、インデックスファイル）を生成します。

```bash
pnpm generate:component
```

**生成されるファイル:**

- `[配置場所]/[ComponentName]/[ComponentName].tsx` - コンポーネント本体
- `[配置場所]/[ComponentName]/[ComponentName].spec.tsx` - テストファイル
- `[配置場所]/[ComponentName]/[ComponentName].stories.tsx` - Storybookファイル
- `[配置場所]/[ComponentName]/index.ts` - エクスポート用ファイル

**入力項目:**

- **コンポーネント名** (PascalCase): 例: `Button`, `UserCard`
- **配置場所**:
  - `src/components/` - 汎用コンポーネント
  - `app/` - ページ固有コンポーネント
- **コンポーネントの種類**:
  - **src/components/の場合**:
    - `common` - 共通コンポーネント
    - `layouts` - レイアウトコンポーネント
  - **app/の場合**:
    - `_components` - app直下のページ用
    - `route_components` - 特定ルート用（ルート名の入力が必要）
- **ルート名** (route_componentsの場合のみ): 例: `news`, `blog`
- **生成確認**: 生成内容の最終確認

**Storybookタイトルの自動生成:**

- `src/components/common/Button` → `components/common/Button`
- `src/app/_components/MainCarousel` → `app/_components/MainCarousel`
- `src/app/news/_components/NewsCard` → `app/news/_components/NewsCard`

### 2. page - App Routerページ生成

Next.js App Routerのページコンポーネント（とオプションでレイアウト）を生成します。

```bash
pnpm generate:page
```

**生成されるファイル:**

- `src/app/[path]/page.tsx` - ページコンポーネント
- `src/app/[path]/layout.tsx` - レイアウトコンポーネント（オプション）

**入力項目:**

- **ページのパス**: 例: `about`, `blog/[slug]`, `dashboard/settings`
- **ページコンポーネント名** (PascalCase): パスから自動生成されるデフォルト値使用可能
- **レイアウトファイル生成**: `true`/`false`
- **生成確認**: 生成内容の最終確認

### 3. layout - App Routerレイアウト生成

Next.js App Routerのレイアウトコンポーネントのみを生成します。

```bash
pnpm generate:layout
```

**生成されるファイル:**

- `src/app/[path]/layout.tsx` - レイアウトコンポーネント

**入力項目:**

- **レイアウトのパス**: 例: `dashboard`, `blog`
- **レイアウトコンポーネント名** (PascalCase): パスから自動生成されるデフォルト値使用可能
- **生成確認**: 生成内容の最終確認

## 生成フロー

各ジェネレーターは以下のフローで動作します：

1. **基本情報の入力**: コンポーネント名、配置場所等の入力
2. **詳細設定**: コンポーネントの種類、オプション等の選択
3. **📋 生成内容の確認**: 以下の情報が表示されます
   - 📦 コンポーネント名
   - 📁 配置場所
   - 📚 Storybookタイトル（コンポーネントの場合）
   - 🔗 生成されるファイル一覧
4. **✅ 最終承認**: 「はい」を選択するとファイルが生成されます

**確認画面の例:**

```
以下の内容でコンポーネントを生成します:

📦 コンポーネント名: Button
📁 配置場所: src/components/common/
📚 Storybookタイトル: components/common/Button

🔗 生成されるファイル:
  - src/components/common/Button/Button.tsx
  - src/components/common/Button/Button.spec.tsx
  - src/components/common/Button/Button.stories.tsx
  - src/components/common/Button/index.ts

上記の内容で生成しますか？ (Y/n)
```

## 使用例

### 基本的な使用方法

```bash
# ジェネレーター選択画面を表示
pnpm generate

# 直接コンポーネント生成を実行
pnpm generate:component

# 直接ページ生成を実行
pnpm generate:page

# 直接レイアウト生成を実行
pnpm generate:layout
```

### 入力例

#### 共通Buttonコンポーネントの生成

```bash
pnpm generate:component
# コンポーネント名: Button
# 配置場所: src/components/ - 汎用コンポーネント
# コンポーネントの種類: 共通コンポーネント (common)
# 生成確認: はい
```

**生成先**: `src/components/common/Button/`
**Storybookタイトル**: `components/common/Button`

#### ニュースルート固有のNewsCardコンポーネントの生成

```bash
pnpm generate:component
# コンポーネント名: NewsCard
# 配置場所: app/ - ページ固有コンポーネント
# コンポーネントの種類: 特定ルート用 ([route]/_components)
# ルート名: news
# 生成確認: はい
```

**生成先**: `src/app/news/_components/NewsCard/`
**Storybookタイトル**: `app/news/_components/NewsCard`

#### app直下のページ用MainCarouselコンポーネントの生成

```bash
pnpm generate:component
# コンポーネント名: MainCarousel
# 配置場所: app/ - ページ固有コンポーネント
# コンポーネントの種類: app直下のページ用 (_components)
# 生成確認: はい
```

**生成先**: `src/app/_components/MainCarousel/`
**Storybookタイトル**: `app/_components/MainCarousel`

#### Aboutページの生成

```bash
pnpm generate:page
# ページのパス: about
# ページコンポーネント名: About (デフォルト)
# レイアウトファイル生成: false
# 生成確認: はい
```

#### 動的ルートのブログページ生成

```bash
pnpm generate:page
# ページのパス: blog/[slug]
# ページコンポーネント名: Slug (デフォルト)
# レイアウトファイル生成: true
# 生成確認: はい
```

#### レイアウトファイルの生成

```bash
pnpm generate:layout
# レイアウトのパス: blog
# レイアウトコンポーネント名: BlogLayout (デフォルト)
# 生成確認: はい
```

## コンポーネント配置場所のガイドライン

### src/components/ - 汎用コンポーネント

- **common**: アプリケーション全体で再利用可能なUIコンポーネント
  - 例: `Button`, `Icon`, `Card`
- **layouts**: レイアウト関連コンポーネント
  - 例: `Header`, `Footer`, `PageHeading`

### app/ - ページ固有コンポーネント

- **app/\_components**: app直下のページ（主にトップページ）に紐づくコンポーネント
  - 例: `MainCarousel`, `HeroSection`
- **app/[route]/\_components**: 特定のルート内でのみ使用するコンポーネント
  - 例: `app/news/_components/NewsCard`, `app/blog/_components/BlogPost`

## テンプレートファイル

テンプレートファイルは `.plop/` ディレクトリに格納されています：

```
.plop/
├── component/
│   ├── component.tsx.hbs          # コンポーネント本体
│   ├── component.spec.tsx.hbs     # テストファイル
│   ├── component.stories.tsx.hbs  # Storybookファイル
│   └── index.ts.hbs              # エクスポートファイル
└── app_component/
    ├── page.tsx.hbs              # ページコンポーネント
    └── layout.tsx.hbs            # レイアウトコンポーネント
```

## 注意事項

- コンポーネント名は必ずPascalCaseで入力してください
- パスの先頭に `/` は不要です
- 既存のファイルがある場合は上書きされません（安全のため）
- 生成前に必ず確認画面で内容を確認してください
- 確認画面で「いいえ」を選択すると、ファイルは生成されません
- 生成後は適宜コードを調整してプロジェクトの要件に合わせてください
- Storybookのタイトルは配置場所に応じて自動生成されます

## カスタマイズ

テンプレートファイルを編集することで、生成されるコードをカスタマイズできます。テンプレートファイルは [Handlebars](https://handlebarsjs.com/) 形式で記述されています。

`plopfile.mjs` を編集することで、新しいジェネレーターの追加や既存ジェネレーターの設定変更も可能です。
