<!-- LLMへの指示: このファイルが読み込まれたら「coding-rule.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# コーディング規約

- [コーディング規約](#コーディング規約)
  - [コンポーネント構成](#コンポーネント構成)
    - [共通ルール](#共通ルール)
    - [コンポーネントの分類](#コンポーネントの分類)
    - [`_components`ディレクトリの配置](#_componentsディレクトリの配置)
    - [コンポーネントの作成](#コンポーネントの作成)
  - [インポート規則](#インポート規則)
    - [バレルファイル](#バレルファイル)
    - [インポートパス](#インポートパス)
  - [ファイル命名規則](#ファイル命名規則)
    - [コンポーネントファイル](#コンポーネントファイル)
    - [その他のファイル](#その他のファイル)
  - [実装ガイドライン](#実装ガイドライン)
    - [クライアントコンポーネント](#クライアントコンポーネント)
    - [サーバーコンポーネント](#サーバーコンポーネント)
    - [設定ファイル](#設定ファイル)
    - [定数ファイル](#定数ファイル)
    - [バレルファイルの実装](#バレルファイルの実装)
    - [Next.jsのApp Routerに関する注意点](#nextjsのapp-routerに関する注意点)


## コンポーネント構成

### 共通ルール

すべてのコンポーネントは以下の構成に従います：

```
ComponentName/
├── ComponentName.tsx       # コンポーネント本体
├── ComponentName.stories.tsx  # Storybookストーリー
└── index.ts                # エクスポート定義
```

### コンポーネントの分類

- **`app/**/_components/**`: 特定のページやルートに紐づくコンポーネント

  - 例: `app/_components/MainCarousel/` - トップページ（app/page.tsx）に紐づくカルーセル
  - 例: `app/news/_components/NewsCard/` - news ルート内でのみ使用するカード

- **`components/common`**: 汎用的なUIコンポーネント

  - 例: `Button`, `Icon` - アプリケーション全体で再利用可能なUI要素

- **`components/layouts`**: レイアウト関連コンポーネント
  - 例: `Header`, `Footer`, `PageHeading` - ページ構造を形成するコンポーネント

### `_components`ディレクトリの配置

`_components`ディレクトリは以下の場所に配置できます：

1. **`app/_components/**`: app/直下のページ（主にトップページ）に紐づくコンポーネント
2. **`app/[route]/_components/**`: 特定のルート内でのみ使用するコンポーネント

特定のルート内でのみ使用するコンポーネントは、そのルートディレクトリ配下の`_components`ディレクトリに配置します。これにより、コンポーネントの使用範囲が明確になり、コードの整理がしやすくなります。

例:

```
app/
├── _components/           # app/直下のページに紐づくコンポーネント
│   └── MainCarousel/      # トップページのカルーセル
├── news/               # /news ルート
│   ├── _components/       # news ルート内でのみ使用するコンポーネント
│   │   └── NewsCard/     # ニュース情報カード
│   └── page.tsx           # /news ページのコンポーネント
└── page.tsx               # / (ルート) ページのコンポーネント
```

### コンポーネントの作成

新しいコンポーネントを作成する際は、以下の手順に従います：

1. 適切なディレクトリを選択

   - app/直下のページに紐づくコンポーネント: `app/_components`
   - 特定のルート内でのみ使用するコンポーネント: `app/[route]/_components`
   - 汎用的なUIコンポーネント: `components/common`
   - レイアウト関連コンポーネント: `components/layouts`

2. コンポーネント名のディレクトリを作成
3. 必要なファイル（`.tsx`, `.stories.tsx`, `index.ts`）を作成
4. 親ディレクトリの`index.ts`を更新してエクスポート（ただし、上記の例外ケースを除く）

## インポート規則

### バレルファイル

各ディレクトリには基本的に`index.ts`ファイルを配置し、そのディレクトリ内のコンポーネントをエクスポートします。ただし、以下の例外があります：

- **`app/`配下の`_`が接頭辞に付かないディレクトリ**: index.tsは不要

  - 理由: Next.jsのルーティングに関連するファイルであり、App Routerの規約に従うため
  - 例: `app/news/`, `app/about/` など

- **`components/`直下**: index.tsは不要

  - 理由: `components/`配下は、`common/`や`layouts/`からインポートするため

- **`libs/`直下**: index.tsは不要

  - 理由: 各ライブラリは個別にインポートするため

- **`libs/microcms/`直下**: index.tsでは`microcms.ts`のみをエクスポート
  - 理由: APIクライアントの実装を隠蔽し、一貫したインターフェースを提供するため

```typescript
// 例: src/components/common/index.ts
export * from './Button'
export * from './Icon'

// 例: src/libs/microcms/index.ts
export * from './microcms'
```

### インポートパス

コンポーネントをインポートする際は、以下の優先順位でパスを指定します：

1. 外部ライブラリ
2. 内部モジュール（`@/`プレフィックスを使用）
3. 相対パス（同一ディレクトリ内のファイル参照時のみ）

```typescript
// 例
import { useState } from 'react'
import { Button } from '@/components/common'
import { MainCarousel } from './MainCarousel'
```

## ファイル命名規則

### コンポーネントファイル

- コンポーネントファイル: `PascalCase.tsx`
- ストーリーファイル: `PascalCase.stories.tsx`
- バレルファイル: `index.ts`

### その他のファイル

- ユーティリティ/ヘルパー: `camelCase.ts`
- 定数ファイル: `camelCase.ts` - ファイル内の定数名は`UPPER_SNAKE_CASE`で定義
- 設定ファイル: `config.ts` - 環境変数の設定値を管理

## 実装ガイドライン

### クライアントコンポーネント

インタラクティブな要素を含むコンポーネントは、ファイルの先頭に`'use client'`ディレクティブを追加します。

```typescript
'use client'

import { useState } from 'react'
// ...
```

### サーバーコンポーネント

データフェッチングを行うコンポーネントは、基本的にサーバーコンポーネントとして実装します。

```typescript
// サーバーコンポーネントの例（'use client'ディレクティブなし）
import { getObject } from '@/libs/microcms'
// ...
```

### 設定ファイル

`config.ts`は環境変数の設定値を管理するファイルです。以下のルールに従います：

- 環境変数は`process.env`から読み込み、型安全に扱う
- 定数名は大文字のスネークケース（`UPPER_SNAKE_CASE`）で定義

```typescript
// 例: src/config.ts
export const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN
export const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY
```

### 定数ファイル

`constants/`ディレクトリ内のファイルは、以下のルールに従います：

- ファイル名はキャメルケース（`camelCase.ts`）
- 定数名は大文字のスネークケース（`UPPER_SNAKE_CASE`）で定義
- 関連する定数はオブジェクトにグループ化することが可能

```typescript
// 例: src/constants/company.ts
export const FACILITY_INFO = {
  postalCode: '223-0057',
  address: '千葉県千葉市緑区緑1-1-1',
  businessHours: {
    weekday: '平日(火〜金)：11時～22時(22時30分完全退館)',
    weekend: '土日祝日：10時～18時30分(19時完全退館)',
    holiday: '休館日：月曜日',
  },
  tel: '045-306-8700',
  email: 'example@example.com',
  access: 'ブルーライン北新横浜駅徒歩1分',
} as const
```

### バレルファイルの実装

バレルファイル（`index.ts`）は、ディレクトリ内のモジュールをまとめてエクスポートするために使用します。以下のルールに従って実装します：

1. **基本的なバレルファイル**:

   - ディレクトリ内の各モジュールを`export * from './ModuleName'`形式でエクスポート
   - 例: `src/components/common/index.ts`, `src/constants/index.ts`

2. **特殊なバレルファイル**:

   - `src/libs/microcms/index.ts`: `microcms.ts`のみをエクスポート

     ```typescript
     export * from './microcms'
     ```

3. **バレルファイルが不要なケース**:
   - `app/`配下の`_`が接頭辞に付かないディレクトリ: Next.jsのルーティングに関連するため
   - `src/components/`直下: 直接`common`や`layouts`からインポートするため
   - `src/libs/`直下: 各ライブラリは個別にインポートするため

### Next.jsのApp Routerに関する注意点

Next.jsのApp Routerでは、以下のファイル命名規則に注意が必要です：

- `page.tsx`: ルートコンポーネント（URLに対応するページ）
- `layout.tsx`: レイアウトコンポーネント
- `loading.tsx`: ローディング状態
- `error.tsx`: エラー状態
- `not-found.tsx`: 404エラー

`_`（アンダースコア）で始まるディレクトリはプライベートディレクトリとして扱われ、ルーティングから除外されます。これらのディレクトリには、ページに関連するコンポーネントやユーティリティを配置します。

```
app/
├── _components/      # プライベートコンポーネント（ルーティングから除外）
├── news/            # /news ルートに対応
│   ├── detail/      # ニュース詳細ページ
│   │   └── [id]/   # 個別のニュース記事
│   │       └── page.tsx
│   └── page/       # ニュース一覧ページ（ページネーション）
│       └── [id]/   # ページ番号
│           └── page.tsx
└── page.tsx         # / (ルート) ページのコンポーネント
```

また、ページネーションやリダイレクトを実装する際は、以下の点に注意が必要です：

**ページネーション**:

- 1ページあたりの表示件数は定数として定義（例: `const PER_PAGE = 10`）
- `generateStaticParams`を使用して静的ページを生成
- 不正なページ番号へのアクセスは`notFound()`を返す

  **リダイレクト**:

- `public/_redirects`ファイルを使用
- ルートパスから適切なページへのリダイレクトを設定  
   例:

      ```
      /news    /news/page/1/    301
      /news/    /news/page/1/    301
      ```
