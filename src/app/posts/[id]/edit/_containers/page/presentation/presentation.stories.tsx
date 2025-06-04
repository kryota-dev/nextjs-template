import { expect, fn, userEvent, within } from 'storybook/test'

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
    error: null,
  },
}

export const Error: Story = {
  args: {
    post: null,
    onSubmit: fn(),
    isLoading: false,
    isLoadingPost: false,
    error: '記事の取得中にエラーが発生しました。',
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
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('既存データ確認', async () => {
      await expect(
        canvas.getByDisplayValue(mockPosts[0].title),
      ).toBeInTheDocument()
      await expect(
        canvas.getByDisplayValue(mockPosts[0].body),
      ).toBeInTheDocument()
    })

    await step('タイトル編集', async () => {
      const titleInput = canvas.getByLabelText('タイトル')
      await userEvent.clear(titleInput)
      await userEvent.type(titleInput, '編集後のタイトル')

      await expect(
        canvas.getByDisplayValue('編集後のタイトル'),
      ).toBeInTheDocument()
    })

    await step('更新ボタンクリック', async () => {
      const submitButton = canvas.getByRole('button', { name: '記事を更新' })
      await userEvent.click(submitButton)

      await expect(args.onSubmit).toHaveBeenCalledWith({
        title: '編集後のタイトル',
        body: mockPosts[0].body,
      })
    })
  },
}
