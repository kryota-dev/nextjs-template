<!-- LLMへの指示: このファイルが読み込まれたら「docs/coding-guidlines/msw.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# MSW (Mock Service Worker) ガイドライン

## 概要

MSW (Mock Service Worker) は、Service Worker APIを使用してブラウザ環境でのネットワークリクエストをインターセプトし、モックレスポンスを返すライブラリです。本プロジェクトでは、テスト環境（Vitest）およびStorybookでのAPIモックとして活用しています。

## 主な用途

- **Vitestでのユニットテスト**: API呼び出しを含むコンポーネントや関数のテスト
- **Storybook**: 外部APIに依存するコンポーネントのストーリー表示
- **開発環境**: 外部APIが利用できない場合のフォールバック

## プロジェクト構成

MSW関連のファイルは以下の構造で配置されています：

```
src/libs/msw/
├── browser.ts          # Browser環境用の設定（Storybook用）
├── node.ts            # Node.js環境用の設定（Vitest用）
└── handlers/
    ├── index.ts       # ハンドラーのエクスポート
    ├── handlers.ts    # ハンドラーの実装
    └── handlers.spec.ts # ハンドラーのテスト
```

## セットアップ

### 1. Service Workerファイル

プロジェクトのpublicディレクトリに [mockServiceWorker.js](../../public/mockServiceWorker.js) が配置されており、Storybook環境でのモックを有効にします。

### 2. ブラウザ環境設定

Storybook用のブラウザ環境設定は [src/libs/msw/browser.ts](../../src/libs/msw/browser.ts) を参照してください。

### 3. Node.js環境設定

Vitest用のNode.js環境設定は [src/libs/msw/node.ts](../../src/libs/msw/node.ts) を参照してください。

## ハンドラーの作成

### REST APIハンドラー

```typescript
import { http, HttpResponse } from 'msw'

export const restHandlers = [
  // GET リクエスト
  http.get('https://api.example.com/users', () => {
    return HttpResponse.json({
      users: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    })
  }),

  // POST リクエスト
  http.post('https://api.example.com/users', async ({ request }) => {
    const newUser = await request.json()
    return HttpResponse.json(
      { id: 3, ...newUser },
      { status: 201 }
    )
  }),

  // エラーレスポンス
  http.get('https://api.example.com/error', () => {
    return HttpResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  })
]
```

既存のハンドラー実装は [src/libs/msw/handlers/handlers.ts](../../src/libs/msw/handlers/handlers.ts) を参照してください。

## Storybookでの使用

### 設定ファイル

Storybookの設定は以下のファイルを参照してください：

- メイン設定: [.storybook/main.ts](../../.storybook/main.ts)
- プレビュー設定: [.storybook/preview.tsx](../../.storybook/preview.tsx)

### ストーリーファイルでの使用

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse } from 'msw'
import { UserList } from './UserList'

const meta: Meta<typeof UserList> = {
  title: 'Components/UserList',
  component: UserList,
  parameters: {
    msw: {
      handlers: [
        // ストーリー固有のハンドラー
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json({
            users: [
              { id: 1, name: 'Story User 1' },
              { id: 2, name: 'Story User 2' }
            ]
          })
        })
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof UserList>

export const Default: Story = {}

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/users', () => {
          return HttpResponse.json({ users: [] })
        })
      ]
    }
  }
}
```

## Vitestでの使用

### セットアップファイル

Vitestでの設定は [vitest.setup.ts](../../vitest.setup.ts) を参照してください。

### テストファイルでの使用

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '@/libs/msw/node'
import { UserList } from './UserList'

describe('UserList', () => {
  test('ユーザー一覧を表示する', async () => {
    // テスト固有のハンドラーを追加
    server.use(
      http.get('https://api.example.com/users', () => {
        return HttpResponse.json({
          users: [
            { id: 1, name: 'Test User 1' },
            { id: 2, name: 'Test User 2' }
          ]
        })
      })
    )

    render(<UserList />)
    
    await waitFor(() => {
      expect(screen.getByText('Test User 1')).toBeInTheDocument()
      expect(screen.getByText('Test User 2')).toBeInTheDocument()
    })
  })

  test('エラー状態を表示する', async () => {
    // エラーレスポンスのハンドラー
    server.use(
      http.get('https://api.example.com/users', () => {
        return HttpResponse.json(
          { message: 'Server Error' },
          { status: 500 }
        )
      })
    )

    render(<UserList />)
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
```

## ベストプラクティス

### 1. ハンドラーの整理

- **機能別にファイルを分割**: 大規模なプロジェクトでは機能ごとにハンドラーファイルを分ける
- **共通ハンドラーと固有ハンドラーの分離**: グローバルで使用するものと特定のテスト/ストーリーで使用するものを分ける

### 2. レスポンスデータの管理

```typescript
// fixtures/users.ts
export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

// handlers/users.ts
import { mockUsers } from '../fixtures/users'

export const userHandlers = [
  http.get('https://api.example.com/users', () => {
    return HttpResponse.json({ users: mockUsers })
  })
]
```

### 3. 動的レスポンス

```typescript
http.get('https://api.example.com/users/:id', ({ params }) => {
  const { id } = params
  const user = mockUsers.find(u => u.id === Number(id))
  
  if (!user) {
    return HttpResponse.json(
      { message: 'User not found' },
      { status: 404 }
    )
  }
  
  return HttpResponse.json({ user })
})
```

### 4. リクエストボディの検証

```typescript
http.post('https://api.example.com/users', async ({ request }) => {
  const body = await request.json()
  
  // バリデーション
  if (!body.name || !body.email) {
    return HttpResponse.json(
      { message: 'Name and email are required' },
      { status: 400 }
    )
  }
  
  return HttpResponse.json(
    { id: Date.now(), ...body },
    { status: 201 }
  )
})
```

## トラブルシューティング

### よくある問題

1. **Service Workerが登録されない**
   - [public/mockServiceWorker.js](../../public/mockServiceWorker.js) が存在することを確認
   - ブラウザの開発者ツールでService Workerの状態を確認

2. **ハンドラーが呼び出されない**
   - URLパターンが正確であることを確認
   - リクエストメソッド（GET, POST等）が一致していることを確認

3. **テストでモックが効かない**
   - [vitest.setup.ts](../../vitest.setup.ts) でサーバーが正しく起動されていることを確認
   - `server.resetHandlers()` が各テスト後に呼ばれていることを確認

### デバッグ方法

```typescript
// ハンドラー内でのログ出力
http.get('https://api.example.com/users', ({ request }) => {
  console.log('MSW: ユーザー一覧リクエストを受信', request.url)
  return HttpResponse.json({ users: mockUsers })
})
```

## 参考リンク

- [MSW公式ドキュメント](https://mswjs.io/)
- [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)
