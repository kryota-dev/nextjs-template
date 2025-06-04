import { http, HttpResponse } from 'msw'

import { ClientFetch } from './ClientFetch'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Common/ClientFetch',
  component: ClientFetch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ClientFetch>

export default meta
type Story = StoryObj<typeof meta>

// デフォルトのストーリー（MSWハンドラーで定義済みのレスポンス）
export const Default: Story = {}

// 異なるユーザーデータをモックするストーリー
export const DifferentUser: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/user', () => {
          return HttpResponse.json({
            id: 'xyz-789',
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice.johnson@example.com',
          })
        }),
      ],
    },
  },
}

// エラー状態をモックするストーリー
export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/user', () => {
          return HttpResponse.json(
            { message: 'User not found' },
            { status: 404 },
          )
        }),
      ],
    },
  },
}

// 遅延レスポンスをモックするストーリー
export const SlowResponse: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.example.com/user', async () => {
          // 2秒遅延
          await new Promise((resolve) => setTimeout(resolve, 2000))

          return HttpResponse.json({
            id: 'slow-123',
            firstName: 'Slow',
            lastName: 'Response',
            email: 'slow.response@example.com',
          })
        }),
      ],
    },
  },
}
