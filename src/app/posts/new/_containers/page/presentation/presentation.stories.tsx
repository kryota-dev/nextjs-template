import { expect, fn, userEvent, within } from 'storybook/test'

import { NewPostPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof NewPostPagePresentation> = {
  title: 'app/posts/new/page/presentation',
  component: NewPostPagePresentation,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof NewPostPagePresentation>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    onSubmit: fn(),
    isLoading: true,
  },
}

export const InteractionTest: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('フォーム入力テスト', async () => {
      const titleInput = canvas.getByLabelText('タイトル')
      const bodyInput = canvas.getByLabelText('本文')

      await userEvent.type(titleInput, 'テスト投稿のタイトル')
      await userEvent.type(bodyInput, 'これはテスト投稿の本文内容です。')

      await expect(
        canvas.getByDisplayValue('テスト投稿のタイトル'),
      ).toBeInTheDocument()
      await expect(
        canvas.getByDisplayValue('これはテスト投稿の本文内容です。'),
      ).toBeInTheDocument()
    })

    await step('送信ボタンクリック', async () => {
      const submitButton = canvas.getByRole('button', { name: '投稿を作成' })
      await userEvent.click(submitButton)

      await expect(args.onSubmit).toHaveBeenCalledWith({
        title: 'テスト投稿のタイトル',
        body: 'これはテスト投稿の本文内容です。',
      })
    })
  },
}
