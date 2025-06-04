import { http, HttpResponse, graphql } from 'msw'

/**
 * MSW リクエストハンドラー
 * テストやStorybook環境でAPIリクエストをモックするためのハンドラー定義
 */

// REST API ハンドラーの例
export const restHandlers = [
  // ユーザー情報取得の例
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
      email: 'john.maverick@example.com',
    })
  }),

  // ユーザー一覧取得の例
  http.get('https://api.example.com/users', () => {
    return HttpResponse.json({
      users: [
        {
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          email: 'john.maverick@example.com',
        },
        {
          id: 'def-456',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
        },
      ],
      total: 2,
    })
  }),

  // ユーザー作成の例
  http.post('https://api.example.com/users', async ({ request }) => {
    const newUser = (await request.json()) as {
      firstName: string
      lastName: string
      email: string
    }

    return HttpResponse.json(
      {
        id: 'new-user-123',
        ...newUser,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),

  // エラー応答の例
  http.get('https://api.example.com/error', () => {
    return HttpResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    )
  }),
]

// GraphQL ハンドラーの例
export const graphqlHandlers = [
  graphql.query('GetUser', ({ variables }) => {
    const { id } = variables as { id: string }

    return HttpResponse.json({
      data: {
        user: {
          id,
          firstName: 'John',
          lastName: 'Maverick',
          email: 'john.maverick@example.com',
        },
      },
    })
  }),

  graphql.mutation('CreateUser', ({ variables }) => {
    const { input } = variables as {
      input: { firstName: string; lastName: string; email: string }
    }

    return HttpResponse.json({
      data: {
        createUser: {
          id: 'new-user-123',
          ...input,
          createdAt: new Date().toISOString(),
        },
      },
    })
  }),
]

// すべてのハンドラーをエクスポート
export const handlers = [...restHandlers, ...graphqlHandlers]
