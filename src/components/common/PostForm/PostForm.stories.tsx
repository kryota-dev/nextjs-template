import { fn, expect, userEvent, within } from 'storybook/test'

import { PostForm } from './PostForm'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof PostForm> = {
  title: 'components/common/PostForm',
  component: PostForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PostForm>

export const Default: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '投稿',
  },
}

export const Loading: Story = {
  args: {
    onSubmit: fn(),
    isLoading: true,
    submitLabel: '投稿',
  },
}

export const WithInitialData: Story = {
  args: {
    post: {
      id: 1,
      title: 'サンプル記事',
      body: 'これはサンプルの記事本文です。',
      userId: 1,
    },
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '更新',
  },
}

export const CreatePost: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '投稿を作成',
  },
}

export const UpdatePost: Story = {
  args: {
    post: {
      id: 1,
      title: '編集中の記事',
      body: 'この記事を編集しています。',
      userId: 1,
    },
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '記事を更新',
  },
}

// インタラクションテスト
export const FormInteractionTest: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '送信',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('フォーム要素の確認', async () => {
      await expect(canvas.getByLabelText('タイトル')).toBeInTheDocument()
      await expect(canvas.getByLabelText('本文')).toBeInTheDocument()
      await expect(
        canvas.getByRole('button', { name: '送信' }),
      ).toBeInTheDocument()
    })

    await step('フォーム入力テスト', async () => {
      const titleInput = canvas.getByLabelText('タイトル')
      const bodyTextarea = canvas.getByLabelText('本文')

      await userEvent.type(titleInput, 'テストタイトル')
      await userEvent.type(bodyTextarea, 'テスト本文の内容です。')

      await expect(titleInput).toHaveValue('テストタイトル')
      await expect(bodyTextarea).toHaveValue('テスト本文の内容です。')
    })

    await step('フォーム送信テスト', async () => {
      const submitButton = canvas.getByRole('button', { name: '送信' })
      await userEvent.click(submitButton)

      await expect(args.onSubmit).toHaveBeenCalledWith({
        title: 'テストタイトル',
        body: 'テスト本文の内容です。',
      })
    })
  },
}

export const ValidationTest: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '送信',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('バリデーションエラーのテスト', async () => {
      // 空の状態で送信ボタンをクリック
      await userEvent.click(canvas.getByRole('button', { name: '送信' }))

      // バリデーションエラーメッセージの確認
      await expect(canvas.getByText('タイトルは必須です')).toBeInTheDocument()
      await expect(canvas.getByText('本文は必須です')).toBeInTheDocument()
    })

    await step('有効な入力の動作確認', async () => {
      // 有効な入力を行う
      await userEvent.type(canvas.getByLabelText('タイトル'), 'テストタイトル')
      await userEvent.type(canvas.getByLabelText('本文'), 'テスト本文内容')

      // 入力されたことを確認
      await expect(
        canvas.getByDisplayValue('テストタイトル'),
      ).toBeInTheDocument()
      await expect(
        canvas.getByDisplayValue('テスト本文内容'),
      ).toBeInTheDocument()
    })
  },
}

export const EditModeTest: Story = {
  args: {
    post: {
      id: 1,
      title: '既存の記事タイトル',
      body: '既存の記事本文',
      userId: 1,
    },
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '更新',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('初期データの確認', async () => {
      await expect(
        canvas.getByDisplayValue('既存の記事タイトル'),
      ).toBeInTheDocument()
      await expect(
        canvas.getByDisplayValue('既存の記事本文'),
      ).toBeInTheDocument()
    })

    await step('既存データの編集', async () => {
      const titleInput = canvas.getByDisplayValue('既存の記事タイトル')
      const bodyTextarea = canvas.getByDisplayValue('既存の記事本文')

      // タイトルの編集
      await userEvent.clear(titleInput)
      await userEvent.type(titleInput, '更新されたタイトル')

      // 本文の編集
      await userEvent.clear(bodyTextarea)
      await userEvent.type(bodyTextarea, '更新された本文')

      await expect(titleInput).toHaveValue('更新されたタイトル')
      await expect(bodyTextarea).toHaveValue('更新された本文')
    })

    await step('編集内容の送信', async () => {
      const submitButton = canvas.getByRole('button', { name: '更新' })
      await userEvent.click(submitButton)

      await expect(args.onSubmit).toHaveBeenCalledWith({
        title: '更新されたタイトル',
        body: '更新された本文',
      })
    })
  },
}

export const LoadingStateTest: Story = {
  args: {
    onSubmit: fn(),
    isLoading: true,
    submitLabel: '送信',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('ローディング状態の確認', async () => {
      // フォーム要素が無効化されていることを確認
      await expect(canvas.getByLabelText('タイトル')).toBeDisabled()
      await expect(canvas.getByLabelText('本文')).toBeDisabled()
      await expect(canvas.getByRole('button')).toBeDisabled()

      // ボタンテキストが変更されていることを確認
      await expect(
        canvas.getByRole('button', { name: '送信中...' }),
      ).toBeInTheDocument()
    })
  },
}

export const KeyboardNavigationTest: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '送信',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Tabキーによるナビゲーションテスト', async () => {
      // フォーカスをフォーム外に設定
      canvas.getByLabelText('タイトル').focus()

      await userEvent.tab()
      await expect(canvas.getByLabelText('本文')).toHaveFocus()

      await userEvent.tab()
      await expect(canvas.getByRole('button', { name: '送信' })).toHaveFocus()
    })

    await step('Shift+Tabによる逆方向ナビゲーション', async () => {
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      await expect(canvas.getByLabelText('本文')).toHaveFocus()

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      await expect(canvas.getByLabelText('タイトル')).toHaveFocus()
    })
  },
}

export const SubmissionTest: Story = {
  args: {
    onSubmit: fn(),
    isLoading: false,
    submitLabel: '投稿',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('フォーム送信のテスト', async () => {
      // フォームに入力
      await userEvent.type(canvas.getByLabelText('タイトル'), 'テスト記事')
      await userEvent.type(
        canvas.getByLabelText('本文'),
        'これはテスト記事の内容です。',
      )

      // 送信ボタンをクリック
      await userEvent.click(canvas.getByRole('button', { name: '投稿' }))

      // onSubmitが正しい値で呼ばれることを確認
      await expect(args.onSubmit).toHaveBeenCalledWith({
        title: 'テスト記事',
        body: 'これはテスト記事の内容です。',
      })
    })
  },
}
