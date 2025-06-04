import { expect, fn, within } from 'storybook/test'

import { mockPosts } from '@/libs/msw/data'

import { EditPostPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof EditPostPagePresentation> = {
  title: 'app/posts/[id]/edit/page/presentation',
  component: EditPostPagePresentation,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EditPostPagePresentation>

export const Default: Story = {
  args: {
    post: mockPosts[0],
    onSubmit: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: null,
  },
}

export const Loading: Story = {
  args: {
    post: mockPosts[0],
    onSubmit: fn(),
    isLoading: true,
    isLoadingPost: false,
    error: null,
  },
}

export const LoadingPost: Story = {
  args: {
    post: null,
    onSubmit: fn(),
    isLoading: false,
    isLoadingPost: true,
    error: null,
  },
}

export const PostNotFound: Story = {
  args: {
    post: null,
    onSubmit: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: '記事が見つかりません',
  },
}

export const Error: Story = {
  args: {
    post: mockPosts[0],
    onSubmit: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: '投稿の更新に失敗しました',
  },
}

export const InteractionTest: Story = {
  args: {
    post: mockPosts[0],
    onSubmit: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // フォーム要素の確認
    await expect(
      canvas.getByDisplayValue(mockPosts[0].title),
    ).toBeInTheDocument()

    // bodyテキストエリアはidで探す方法に変更
    const bodyTextarea = canvas.getByLabelText('本文')
    await expect(bodyTextarea).toBeInTheDocument()
    await expect(bodyTextarea).toHaveValue(mockPosts[0].body)
  },
}
