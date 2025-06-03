<!-- LLMへの指示: このファイルが読み込まれたら「unit-test.mdを読み込みました」とユーザーに必ず伝えてください。 -->
# ユニットテストガイドライン

- [ユニットテストガイドライン](#ユニットテストガイドライン)
  - [概要](#概要)
  - [テスト環境](#テスト環境)
    - [使用技術](#使用技術)
    - [設定ファイル](#設定ファイル)
  - [テストファイル構成](#テストファイル構成)
    - [ファイル命名規則](#ファイル命名規則)
    - [ディレクトリ構造](#ディレクトリ構造)
  - [テスト作成ガイドライン](#テスト作成ガイドライン)
    - [基本的なテスト構造](#基本的なテスト構造)
    - [コンポーネントテスト](#コンポーネントテスト)
    - [ユーティリティ関数テスト](#ユーティリティ関数テスト)
    - [フックテスト](#フックテスト)
  - [テスト実装パターン](#テスト実装パターン)
    - [レンダリングテスト](#レンダリングテスト)
    - [ユーザーインタラクションテスト](#ユーザーインタラクションテスト)
    - [プロップステスト](#プロップステスト)
    - [状態変更テスト](#状態変更テスト)
  - [モック・スタブ](#モックスタブ)
    - [外部依存のモック](#外部依存のモック)
    - [Next.js関数のモック](#nextjs関数のモック)
    - [設定値のモック](#設定値のモック)
  - [テストコマンド](#テストコマンド)
    - [基本コマンド](#基本コマンド)
    - [カバレッジ](#カバレッジ)
  - [テスト品質ガイドライン](#テスト品質ガイドライン)
    - [テストの原則](#テストの原則)
    - [避けるべきパターン](#避けるべきパターン)
    - [推奨パターン](#推奨パターン)
    - [テストカバレッジ目標](#テストカバレッジ目標)

## 概要

本プロジェクトでは、高品質なコードを保証するためにユニットテストを必須とします。Vitestを使用したテスト環境で、React Testing Libraryを活用してユーザー中心のテストを作成します。

## テスト環境

### 使用技術

- **Vitest**: テストランナー・フレームワーク
- **React Testing Library**: Reactコンポーネントテスト
- **Jest DOM**: DOM要素のアサーション
- **User Event**: ユーザーインタラクションシミュレーション
- **jsdom**: ブラウザ環境のシミュレーション

### 設定ファイル

- `vitest.config.ts`: Vitestの設定
- `vitest.setup.ts`: テスト環境のセットアップ

## テストファイル構成

### ファイル命名規則

- **スペックファイル**: `{ComponentName}.spec.tsx` または `{functionName}.spec.ts`
- **テストファイル**: `{ComponentName}.test.tsx` または `{functionName}.test.ts`

```
推奨: .spec.{ts,tsx}
許可: .test.{ts,tsx}
```

### ディレクトリ構造

テストファイルは、テスト対象のファイルと同じディレクトリに配置します：

```
src/
├── components/
│   └── common/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.spec.tsx       # ←スペックファイル
│           ├── Button.stories.tsx
│           └── index.ts
├── utils/
│   ├── format.ts
│   └── format.spec.ts               # ←スペックファイル
└── libs/
    └── microcms/
        ├── microcms.ts
        └── microcms.spec.ts         # ←スペックファイル
```

## テスト作成ガイドライン

### 基本的なテスト構造

```typescript
import { describe, expect, it } from 'vitest'

describe('テスト対象の説明', () => {
  it('期待する動作の説明', () => {
    // Arrange（準備）
    // Act（実行）
    // Assert（検証）
  })
})
```

### コンポーネントテスト

React Testing Libraryを使用してユーザー中心のテストを作成します：

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('テキストが正しく表示される', () => {
    render(<Button>クリック</Button>)
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument()
  })

  it('クリックイベントが正しく動作する', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>クリック</Button>)
    
    await user.click(screen.getByRole('button', { name: 'クリック' }))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

### ユーティリティ関数テスト

純粋関数のテストは単純明快に作成します：

```typescript
import { describe, expect, it } from 'vitest'

import { formatDate } from './format'

describe('formatDate', () => {
  it('日付を正しい形式でフォーマットする', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-01')
  })

  it('無効な日付の場合はエラーを投げる', () => {
    expect(() => formatDate(null, 'YYYY-MM-DD')).toThrow('Invalid date')
  })
})
```

### フックテスト

カスタムフックのテストは`renderHook`を使用します：

```typescript
import { renderHook, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('初期値が正しく設定される', () => {
    const { result } = renderHook(() => useCounter(5))
    expect(result.current.count).toBe(5)
  })

  it('incrementが正しく動作する', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

## テスト実装パターン

### レンダリングテスト

コンポーネントが正しくレンダリングされることを確認：

```typescript
it('必要な要素が表示される', () => {
  render(<UserProfile name="田中太郎" email="tanaka@example.com" />)
  
  expect(screen.getByText('田中太郎')).toBeInTheDocument()
  expect(screen.getByText('tanaka@example.com')).toBeInTheDocument()
})
```

### ユーザーインタラクションテスト

ユーザーの操作をシミュレートしてテスト：

```typescript
it('フォーム送信が正しく動作する', async () => {
  const user = userEvent.setup()
  const handleSubmit = vi.fn()

  render(<ContactForm onSubmit={handleSubmit} />)
  
  await user.type(screen.getByLabelText('名前'), '田中太郎')
  await user.type(screen.getByLabelText('メール'), 'tanaka@example.com')
  await user.click(screen.getByRole('button', { name: '送信' }))
  
  expect(handleSubmit).toHaveBeenCalledWith({
    name: '田中太郎',
    email: 'tanaka@example.com'
  })
})
```

### プロップステスト

異なるプロップスでの動作を確認：

```typescript
it.each([
  ['primary', 'bg-blue-500'],
  ['secondary', 'bg-gray-500'],
  ['danger', 'bg-red-500'],
])('variant=%sの場合、正しいスタイルが適用される', (variant, expectedClass) => {
  render(<Button variant={variant}>テスト</Button>)
  expect(screen.getByRole('button')).toHaveClass(expectedClass)
})
```

### 状態変更テスト

コンポーネントの状態変更を確認：

```typescript
it('トグルボタンの状態が正しく変化する', async () => {
  const user = userEvent.setup()
  
  render(<ToggleButton />)
  
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('aria-pressed', 'false')
  
  await user.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'true')
})
```

## モック・スタブ

### 外部依存のモック

```typescript
import { vi } from 'vitest'

// 外部ライブラリのモック
vi.mock('dayjs', () => ({
  default: vi.fn(() => ({
    format: vi.fn(() => '2024-01-01'),
  })),
}))
```

### Next.js関数のモック

```typescript
// Next.js router のモック
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '/test-path',
}))
```

### 設定値のモック

プロジェクトの設定ファイル（`vitest.setup.ts`に記載）：

```typescript
// 環境変数をモック
vi.mock('@/config', () => ({
  NEXT_PUBLIC_GTM_ID: 'GTM-1234567890',
}))
```

## テストコマンド

### 基本コマンド

```bash
# ウォッチモード（デフォルト）
pnpm test:unit

# テストを一度だけ実行
pnpm test:unit run

# 特定ファイルのテスト
pnpm test:unit Button.spec.tsx

# UI モード
pnpm test:unit-ui
```

### カバレッジ

```bash
# カバレッジ付きテスト実行
pnpm test:unit-coverage

# カバレッジレポートを開く
open .vitest/coverage/index.html
```

## テスト品質ガイドライン

### テストの原則

1. **AAA パターン**: Arrange, Act, Assert の順序で記述
2. **1テスト1機能**: 1つのテストで1つの機能のみをテスト
3. **ユーザー中心**: 実装詳細ではなく、ユーザーの視点でテスト
4. **読みやすい命名**: テストの意図が明確に分かる名前を付ける
5. **独立性**: テスト間で依存関係を持たない

### 避けるべきパターン

```typescript
// ❌ 実装詳細をテストしている
expect(component.state.isLoading).toBe(true)

// ❌ 複数の機能を一つのテストでテストしている
it('フォームが正しく動作する', async () => {
  // バリデーション、送信、リセットを全部テスト
})

// ❌ あいまいなテスト名
it('should work', () => {})
```

### 推奨パターン

```typescript
// ✅ ユーザーが見る結果をテストする
expect(screen.getByText('読み込み中...')).toBeInTheDocument()

// ✅ 単一責任
it('必須フィールドが空の場合、バリデーションエラーが表示される', () => {})
it('有効なデータで送信した場合、成功メッセージが表示される', () => {})

// ✅ 明確なテスト名
it('ユーザーがボタンをクリックした時、モーダルが開く', () => {})
```

### テストカバレッジ目標

- **ライン カバレッジ**: 80% 以上
- **ブランチ カバレッジ**: 75% 以上
- **関数 カバレッジ**: 85% 以上

ただし、カバレッジの数字よりも、重要な機能やエッジケースが適切にテストされていることを優先します。
