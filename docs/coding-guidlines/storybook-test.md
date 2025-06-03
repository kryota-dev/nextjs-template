<!-- LLMへの指示: このファイルが読み込まれたら「docs/coding-guidlines/storybook-test.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# Storybookテストガイドライン

- [Storybookテストガイドライン](#storybookテストガイドライン)
  - [概要](#概要)
  - [テスト環境](#テスト環境)
    - [使用技術](#使用技術)
    - [設定ファイル](#設定ファイル)
  - [テストファイル構成](#テストファイル構成)
    - [ファイル命名規則](#ファイル命名規則)
    - [ディレクトリ構造](#ディレクトリ構造)
  - [基本的なStorybookテスト](#基本的なstorybookテスト)
    - [テスト対象ストーリーの作成](#テスト対象ストーリーの作成)
    - [Portable Storiesを使用したテスト](#portable-storiesを使用したテスト)
  - [インタラクションテスト](#インタラクションテスト)
    - [play関数を使用したテスト](#play関数を使用したテスト)
    - [フォームテスト](#フォームテスト)
  - [アクセシビリティテスト](#アクセシビリティテスト)
    - [a11yアドオンを使用したテスト](#a11yアドオンを使用したテスト)
    - [キーボード操作テスト](#キーボード操作テスト)
  - [ビジュアルテスト](#ビジュアルテスト)
  - [コンポーネント固有のテスト](#コンポーネント固有のテスト)
    - [共通コンポーネント](#共通コンポーネント)
    - [ページコンポーネント](#ページコンポーネント)
  - [テストデータとモック](#テストデータとモック)
    - [APIのモック](#apiのモック)
    - [Next.js機能のモック](#nextjs機能のモック)
  - [テスト実行とデバッグ](#テスト実行とデバッグ)
  - [テスト品質ガイドライン](#テスト品質ガイドライン)
    - [テストの原則](#テストの原則)
    - [ベストプラクティス](#ベストプラクティス)
    - [テストカバレッジ目標](#テストカバレッジ目標)

## 概要

本プロジェクトでは、Storybookを使用してコンポーネントの動作とビジュアルの品質を保証します。Storybook Test RunnerとVitestを統合したテスト環境で、インタラクション、アクセシビリティ、ビジュアルテストを実施します。

## テスト環境

### 使用技術

- **Storybook**: コンポーネント開発・テスト環境
- **@storybook/addon-vitest**: VitestとStorybookの統合
- **@storybook/addon-a11y**: アクセシビリティテスト
- **Vitest**: テストランナー
- **Playwright**: ブラウザテスト環境

### 設定ファイル

- `vitest.config.ts`: Storybookテストプロジェクト設定
- `.storybook/vitest.setup.ts`: Storybookテスト環境セットアップ
- `.storybook/main.ts`: Storybookメイン設定
- `.storybook/preview.tsx`: グローバル設定とデコレーター

## テストファイル構成

### ファイル命名規則

- **ストーリーファイル**: `{ComponentName}.stories.tsx`
- **テスト対象**: ストーリーファイル内のストーリー
- **追加テスト**: `{ComponentName}.stories.test.tsx`（必要に応じて）

### ディレクトリ構造

ストーリーファイルは、コンポーネントと同じディレクトリに配置：

```
src/
├── components/
│   └── common/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.stories.tsx      # ←ストーリーファイル
│           ├── Button.spec.tsx         # ←ユニットテスト
│           └── index.ts
└── pages/
    └── Home/
        ├── Home.tsx
        ├── Home.stories.tsx           # ←ページストーリー
        └── index.ts
```

## 基本的なStorybookテスト

### テスト対象ストーリーの作成

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Button } from './Button'

export default {
  title: 'components/common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'ボタン',
  },
}

export const WithInteraction: Story = {
  args: {
    children: 'クリックテスト',
    onClick: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('レンダリング確認', async () => {
      await expect(canvas.getByRole('button')).toBeInTheDocument()
    })
    
    await step('クリックテスト', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'クリックテスト' }))
      await expect(args.onClick).toHaveBeenCalled()
    })
  },
}
```

### Portable Storiesを使用したテスト

```typescript
// Button.stories.test.tsx (必要な場合のみ)
import { composeStories } from '@storybook/nextjs-vite'
import { describe, expect, it } from 'vitest'

import * as stories from './Button.stories'

const { Default, WithInteraction } = composeStories(stories)

describe('Button Stories', () => {
  it('Defaultストーリーが正しく動作する', async () => {
    await Default.run()
  })
  
  it('WithInteractionストーリーが正しく動作する', async () => {
    await WithInteraction.run()
  })
})
```

## インタラクションテスト

### play関数を使用したテスト

```typescript
import { expect, fn, userEvent, within } from 'storybook/test'

export const FormTest: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('フォーム入力', async () => {
      await userEvent.type(canvas.getByLabelText('名前'), '田中太郎')
      await userEvent.type(canvas.getByLabelText('メールアドレス'), 'tanaka@example.com')
    })
    
    await step('送信ボタンクリック', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '送信' }))
      await expect(args.onSubmit).toHaveBeenCalledWith({
        name: '田中太郎',
        email: 'tanaka@example.com',
      })
    })
  },
}
```

### フォームテスト

```typescript
export const FormValidationTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('バリデーションエラー確認', async () => {
      await userEvent.click(canvas.getByRole('button', { name: '送信' }))
      await expect(canvas.getByText('名前は必須です')).toBeInTheDocument()
    })
    
    await step('正しい入力でエラー解消', async () => {
      await userEvent.type(canvas.getByLabelText('名前'), '田中太郎')
      await expect(canvas.queryByText('名前は必須です')).not.toBeInTheDocument()
    })
  },
}
```

## アクセシビリティテスト

### a11yアドオンを使用したテスト

```typescript
export const AccessibilityTest: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // フォーカス順序の確認
    await userEvent.tab()
    await expect(canvas.getAllByRole('button')[0]).toHaveFocus()
  },
}
```

### キーボード操作テスト

```typescript
export const KeyboardNavigationTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('Tab順序確認', async () => {
      await userEvent.tab()
      await expect(canvas.getByRole('button', { name: '前へ' })).toHaveFocus()
      
      await userEvent.tab()
      await expect(canvas.getByRole('button', { name: '次へ' })).toHaveFocus()
    })
    
    await step('Enterキー実行', async () => {
      await userEvent.keyboard('{Enter}')
      await expect(canvas.getByText('次のページ')).toBeInTheDocument()
    })
  },
}
```

## ビジュアルテスト

```typescript
// Chromaticを使用した場合の設定例
export const ResponsiveTest: Story = {
  parameters: {
    chromatic: {
      viewports: [375, 768, 1200],
      pauseAnimationAtEnd: true,
    },
    viewport: {
      viewports: {
        mobile: { name: 'mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'desktop', styles: { width: '1200px', height: '800px' } },
      },
    },
  },
}
```

## コンポーネント固有のテスト

### 共通コンポーネント

```typescript
// Modal.stories.tsx
export const ModalInteractionTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('モーダルオープン・クローズ', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'モーダルを開く' }))
      await expect(canvas.getByRole('dialog')).toBeVisible()
      
      await userEvent.keyboard('{Escape}')
      await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    })
  },
}
```

### ページコンポーネント

```typescript
// HomePage.stories.tsx
export const PageTest: Story = {
  parameters: {
    nextjs: { appDirectory: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    await expect(canvas.getByRole('main')).toBeInTheDocument()
    await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument()
    
    const ctaButton = canvas.getByRole('link', { name: '詳細を見る' })
    await expect(ctaButton).toHaveAttribute('href', '/about')
  },
}
```

## テストデータとモック

### APIのモック

```typescript
import { http, HttpResponse } from 'msw'

const mockUserData = {
  id: 1,
  name: '田中太郎',
  email: 'tanaka@example.com',
}

export const WithApiMock: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => HttpResponse.json([mockUserData])),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText('田中太郎')).toBeInTheDocument()
  },
}
```

### Next.js機能のモック

```typescript
export const WithRouterMock: Story = {
  parameters: {
    nextjs: {
      router: { pathname: '/users/1', query: { id: '1' } },
      image: { domains: ['example.com'] },
    },
  },
}
```

## テスト実行とデバッグ

```bash
# Storybookテストの実行
pnpm test:storybook

# カバレッジ付きでテスト実行
pnpm test:storybook-coverage

# Storybook開発サーバー起動
pnpm dev:storybook
```

## テスト品質ガイドライン

### テストの原則

1. **ユーザー中心**: ユーザーの視点でテストを作成
2. **実際の使用状況**: 実際の使用状況を再現
3. **保守性**: 理解しやすく、保守しやすいテスト
4. **信頼性**: 安定して実行できるテスト

### ベストプラクティス

```typescript
// ✅ 良い例：step関数でテストを構造化
export const StructuredTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    
    await step('初期状態確認', async () => {
      await expect(canvas.getByRole('button')).toBeDisabled()
    })
    
    await step('入力後の状態確認', async () => {
      await userEvent.type(canvas.getByLabelText('名前'), '田中太郎')
      await expect(canvas.getByRole('button')).toBeEnabled()
    })
  },
}

// ❌ 悪い例：実装詳細に依存
export const BadExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 内部実装に依存したテスト
    await expect(canvas.container.querySelector('.btn-primary')).toBeInTheDocument()
  },
}
```

### テストカバレッジ目標

- **ストーリーカバレッジ**: 全コンポーネントの90%以上
- **インタラクションテスト**: 主要な操作の100%
- **アクセシビリティテスト**: 公開コンポーネントの100%

---

**重要**: このガイドラインに従い、品質の高いStorybookテストを作成することで、コンポーネントの動作とユーザー体験の品質を保証します。テスト作成時は常にユーザーの視点を意識し、実際の使用状況を再現することを心がけてください。
