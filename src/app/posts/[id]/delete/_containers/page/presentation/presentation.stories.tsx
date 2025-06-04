import { expect, fn, userEvent, within } from 'storybook/test'

import { mockPosts } from '@/libs/msw/data'

import { DeletePostPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof DeletePostPagePresentation> = {
  title: 'app/posts/[id]/delete/page/presentation',
  component: DeletePostPagePresentation,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DeletePostPagePresentation>

export const Default: Story = {
  args: {
    post: mockPosts[0],
    onDelete: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: null,
  },
}

export const LongContent: Story = {
  args: {
    post: {
      ...mockPosts[0],
      title:
        'とても長いタイトルの記事：この記事は非常に長いタイトルを持っており、削除確認画面での表示テストに使用されます',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    onDelete: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: null,
  },
}

export const Loading: Story = {
  args: {
    post: mockPosts[0],
    onDelete: fn(),
    isLoading: true,
    isLoadingPost: false,
    error: null,
  },
}

export const LoadingPost: Story = {
  args: {
    post: null,
    onDelete: fn(),
    isLoading: false,
    isLoadingPost: true,
    error: null,
  },
}

export const PostNotFound: Story = {
  args: {
    post: null,
    onDelete: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: null,
  },
}

export const Error: Story = {
  args: {
    post: null,
    onDelete: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: '記事の取得中にエラーが発生しました。',
  },
}

export const InteractionTest: Story = {
  args: {
    post: mockPosts[0],
    onDelete: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: null,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('削除対象記事確認', async () => {
      await expect(canvas.getByText(mockPosts[0].title)).toBeInTheDocument()
      await expect(
        canvas.getByText(/この操作は取り消すことができません/),
      ).toBeInTheDocument()
    })

    await step('削除ボタンクリック', async () => {
      const deleteButton = canvas.getByRole('button', { name: '削除する' })
      await userEvent.click(deleteButton)

      await expect(args.onDelete).toHaveBeenCalled()
    })
  },
}
