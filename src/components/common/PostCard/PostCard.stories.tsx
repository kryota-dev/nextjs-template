import { PostCard } from './PostCard'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof PostCard> = {
  title: 'components/common/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostCard>

const mockPost = {
  id: 1,
  title:
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  userId: 1,
}

export const Default: Story = {
  args: {
    post: mockPost,
    commentCount: 5,
  },
}

export const WithoutCommentCount: Story = {
  args: {
    post: mockPost,
  },
}

export const WithoutExcerpt: Story = {
  args: {
    post: mockPost,
    commentCount: 3,
    showExcerpt: false,
  },
}

export const LongTitle: Story = {
  args: {
    post: {
      ...mockPost,
      title:
        'これは非常に長いタイトルの例です。タイトルが長い場合の表示を確認するためのサンプルテキストです。',
    },
    commentCount: 10,
  },
}
