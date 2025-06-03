<!-- LLMへの指示: このファイルが読み込まれたら「docs/coding-guidlines/microcms.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# microCMSガイドライン

## 概要

このプロジェクトでは、[microCMS](https://microcms.io/)をHeadless CMSとして採用し、コンテンツ管理を行います。microCMSから取得したコンテンツは、セキュリティを考慮したサニタイズ処理を経て、Reactコンポーネントとして安全に表示されます。

## 技術スタック

- **microCMS JavaScript SDK**: microCMS APIとの通信
- **DOMPurify**: HTMLコンテンツのサニタイズ
- **html-react-parser**: HTMLからReactコンポーネントへの変換

## 環境設定

### 必要な環境変数

microCMS APIを使用するために、以下の環境変数を設定してください：

```env
# 必須：microCMSサービスドメイン（クライアントサイドでも参照可能）
NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN=your-service-domain

# オプション：クライアントサイド用APIキー（公開される可能性があるため注意）
NEXT_PUBLIC_MICROCMS_API_KEY=your-public-api-key

# 推奨：サーバーサイド専用APIキー（セキュアな操作に使用）
SERVER_ONLY_MICROCMS_API_KEY=your-server-only-api-key
```

### APIキーの優先順位

APIキーは以下の優先順位で選択されます：

1. `SERVER_ONLY_MICROCMS_API_KEY`（サーバーサイド専用）
2. `NEXT_PUBLIC_MICROCMS_API_KEY`（クライアントサイド対応）

セキュリティの観点から、サーバーサイドでの処理には `SERVER_ONLY_MICROCMS_API_KEY` の使用を推奨します。

## 基本的な使用方法

### 1. ライブラリのインポート

```tsx
import { getList, getObject, getContent, getAllContents, getAllContentIds } from '@/libs/microcms'
```

### 2. API関数の使用

#### リストコンテンツの取得

```tsx
// ニュース一覧を取得
const news = await getList('news', {
  limit: 10,
  offset: 0,
  filters: 'publishedAt[greater_than]2024-01-01',
})

console.log(news.contents) // ニュースコンテンツの配列
console.log(news.totalCount) // 総件数
```

#### オブジェクトコンテンツの取得

```tsx
// プロフィール情報を取得
const profile = await getObject('profiles')

console.log(profile.name) // プロフィール名
console.log(profile.bio) // 自己紹介
```

#### 個別コンテンツの取得

```tsx
// 特定のニュース記事を取得
const article = await getContent('news', 'article-id-123', {
  fields: 'title,content,publishedAt',
})

console.log(article.title) // 記事タイトル
console.log(article.content) // 記事本文
```

#### 全コンテンツの取得（101件以上対応）

```tsx
// 全ニュース記事を取得（ページング制限なし）
const allNews = await getAllContents('news')

console.log(allNews.length) // 全記事数
```

#### 全コンテンツIDの取得

```tsx
// 全ニュース記事のIDを取得
const allIds = await getAllContentIds('news', 'category[equals]important')

console.log(allIds) // ['id1', 'id2', 'id3', ...]
```

## 型定義の活用

### コンテンツ型の定義

以下はmicroCMSのコンテンツ型の定義例です：

```tsx
// src/libs/microcms/types/contents/index.ts
export interface Responses {
  /** お知らせ */
  news: NewsContent
  /** プロフィール */
  profiles: ProfileContent
  /** ボタンの種類 */
  btn_type: BtnTypeContent
}

export type Endpoints = keyof Responses
```

### 型安全な使用方法

```tsx
// TypeScriptの型チェックを活用
const news = await getList('news') // NewsContent型として推論される
const profile = await getObject('profiles') // ProfileContent型として推論される

// 存在しないエンドポイントはコンパイルエラーになる
// const invalid = await getList('invalid') // ❌ エラー
```

## ユーティリティ関数

### getTotalCount

microCMSの総件数を効率的に取得するユーティリティ関数です：

```tsx
import { getTotalCount } from '@/libs/microcms/utils'

// 効率的な総件数取得（limit=0で実際のコンテンツは取得しない）
const totalCount = await getTotalCount('news', {
  filters: 'publishedAt[greater_than]2024-01-01',
})

console.log(totalCount) // 対象のニュース記事数
```

## エラーハンドリング

### APIエラーの処理

```tsx
try {
  const news = await getList('news')
  // 成功時の処理
} catch (error) {
  if (error instanceof Error) {
    console.error('microCMS API Error:', error.message)
    // エラー処理（フォールバック表示など）
  }
}
```

### 環境変数エラーの処理

```tsx
// クライアント初期化時に環境変数不足でエラーが発生する可能性
try {
  const news = await getList('news')
} catch (error) {
  if (error.message.includes('MICROCMS_SERVICE_DOMAIN')) {
    console.error('microCMS設定エラー: サービスドメインが設定されていません')
  }
  if (error.message.includes('API_KEY')) {
    console.error('microCMS設定エラー: APIキーが設定されていません')
  }
}
```

## パフォーマンス最適化

### フィールド指定による最適化

```tsx
// 必要なフィールドのみを取得してパフォーマンスを向上
const news = await getList('news', {
  fields: 'id,title,publishedAt', // content等の重いフィールドを除外
  limit: 10,
})
```

## セキュリティ考慮事項

### APIキーの管理

- `NEXT_PUBLIC_*` 環境変数はクライアントサイドで参照可能なため、機密性の低い操作にのみ使用
- `SERVER_ONLY_MICROCMS_API_KEY` をサーバーサイドの機密操作に使用
- 本番環境では適切な権限レベルのAPIキーを使用

### コンテンツのサニタイズ

microCMSから取得したHTMLコンテンツは、必ず`sanitize`関数を通してサニタイズしてください：

```tsx
import { sanitize } from '@/libs/sanitize'

const news = await getContent('news', 'article-id')
const safeContent = sanitize(news.content) // HTMLをサニタイズ
```

## 参考リンク

- [microCMS公式ドキュメント](https://document.microcms.io/)
- [microCMS JavaScript SDK](https://github.com/microcmsio/microcms-js-sdk)
