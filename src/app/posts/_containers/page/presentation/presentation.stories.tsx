import { mockPosts } from '@/libs/msw/data'

import { PostsPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof PostsPagePresentation> = {
  title: 'app/posts/page/presentation',
  component: PostsPagePresentation,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostsPagePresentation>

// 共通化したモックデータにコメント数を追加
const mockPostsWithComments = mockPosts.map((post, index) => ({
  ...post,
  commentCount: (index % 5) + 1, // 1-5のコメント数
}))

export const Default: Story = {
  args: {
    posts: mockPostsWithComments,
  },
}

export const Empty: Story = {
  args: {
    posts: [],
  },
}

export const Error: Story = {
  args: {
    posts: [],
    error: '記事の取得でエラーが発生しました。',
  },
}

export const SinglePost: Story = {
  args: {
    posts: [mockPostsWithComments[0]],
  },
}

export const ManyPosts: Story = {
  args: {
    posts: [
      ...mockPostsWithComments,
      ...mockPostsWithComments.map((post, index) => ({
        ...post,
        id: post.id + 100,
        title: `続き記事 ${index + 1}: ${post.title}`,
        commentCount: (index % 3) + 1,
      })),
    ],
  },
}
