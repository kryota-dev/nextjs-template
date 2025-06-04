import { mockPosts, mockComments } from '@/libs/msw/data'

import { PostDetailPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof PostDetailPagePresentation> = {
  title: 'app/posts/[id]/page/presentation',
  component: PostDetailPagePresentation,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostDetailPagePresentation>

// 投稿1のコメントを抽出
const post1Comments = mockComments.filter((comment) => comment.postId === 1)

export const Default: Story = {
  args: {
    post: mockPosts[0],
    comments: post1Comments,
  },
}

export const WithManyComments: Story = {
  args: {
    post: mockPosts[1],
    comments: mockComments, // 全コメントを表示
  },
}

export const NoComments: Story = {
  args: {
    post: mockPosts[2],
    comments: [],
  },
}

export const LongContent: Story = {
  args: {
    post: {
      ...mockPosts[0],
      title:
        'とても長いタイトル：この記事は非常に長いタイトルを持っており、レイアウトのテストに使用されます。タイトルの折り返し表示を確認できます。',
      body: `これは非常に長い記事の本文です。複数の段落にわたって記述されており、レイアウトのテストに使用されます。

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
    },
    comments: post1Comments,
  },
}

export const PostNotFound: Story = {
  args: {
    post: null,
    comments: [],
  },
}

export const Error: Story = {
  args: {
    post: null,
    comments: [],
    error: '投稿の取得中にエラーが発生しました。',
  },
}
