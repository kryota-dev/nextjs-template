import { describe, expect, it } from 'vitest'

import { cn } from './cn'

describe('cn', () => {
  it('基本的な文字列クラスを結合する', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('単一の文字列を正しく返す', () => {
    const result = cn('single-class')
    expect(result).toBe('single-class')
  })

  it('配列形式のクラスを結合する', () => {
    const result = cn(['class1', 'class2'], ['class3', 'class4'])
    expect(result).toBe('class1 class2 class3 class4')
  })

  it('オブジェクト形式の条件付きクラスを正しく処理する', () => {
    const result = cn({
      active: true,
      disabled: false,
      visible: true,
      hidden: false,
    })
    expect(result).toBe('active visible')
  })

  it('混合形式の入力を正しく処理する', () => {
    const result = cn(
      'base-class',
      ['array-class1', 'array-class2'],
      {
        'conditional-true': true,
        'conditional-false': false,
      },
      'final-class',
    )
    expect(result).toBe(
      'base-class array-class1 array-class2 conditional-true final-class',
    )
  })

  it('Tailwindクラスの重複を正しく解決する', () => {
    // tailwind-mergeの機能：後のクラスが前のクラスを上書き
    const result = cn('bg-red-500', 'bg-blue-500')
    expect(result).toBe('bg-blue-500')
  })

  it('同じプロパティのTailwindクラスが複数ある場合、最後の値を採用する', () => {
    const result = cn('text-sm', 'text-lg', 'text-xl')
    expect(result).toBe('text-xl')
  })

  it('異なるプロパティのTailwindクラスは両方保持される', () => {
    const result = cn('bg-red-500', 'text-white', 'p-4')
    expect(result).toBe('bg-red-500 text-white p-4')
  })

  it('空文字列や空の配列を無視する', () => {
    const result = cn('', 'valid-class', [], 'another-class', '')
    expect(result).toBe('valid-class another-class')
  })

  it('nullやundefinedを無視する', () => {
    const result = cn('valid-class', null, undefined, 'another-class')
    expect(result).toBe('valid-class another-class')
  })

  it('引数なしの場合は空文字列を返す', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('falsy値のみの場合は空文字列を返す', () => {
    const result = cn(null, undefined, false, '', 0)
    expect(result).toBe('')
  })

  it('複雑なTailwindクラスの組み合わせを正しく処理する', () => {
    const result = cn(
      'hover:bg-red-500',
      'focus:bg-red-600',
      'hover:bg-blue-500', // hover:bg-red-500を上書き
      'active:bg-green-500',
    )
    expect(result).toBe(
      'focus:bg-red-600 hover:bg-blue-500 active:bg-green-500',
    )
  })

  it('レスポンシブクラスを正しく処理する', () => {
    const result = cn(
      'w-full',
      'sm:w-1/2',
      'md:w-1/3',
      'lg:w-1/4',
      'sm:w-2/3', // sm:w-1/2を上書き
    )
    expect(result).toBe('w-full md:w-1/3 lg:w-1/4 sm:w-2/3')
  })

  it('条件付きTailwindクラスを正しく処理する（active状態）', () => {
    const isActive = true
    const isDisabled = false

    const result = cn(
      'btn',
      {
        'btn-active': isActive,
        'btn-disabled': isDisabled,
      },
      'btn-lg',
    )
    expect(result).toBe('btn btn-active btn-lg')
  })

  it('条件付きTailwindクラスを正しく処理する（small size）', () => {
    const isActive = false
    const isDisabled = true

    const result = cn(
      'btn',
      {
        'btn-active': isActive,
        'btn-disabled': isDisabled,
      },
      'btn-sm',
    )
    expect(result).toBe('btn btn-disabled btn-sm')
  })

  it('深くネストした配列とオブジェクトを正しく処理する', () => {
    const result = cn(
      'base',
      [
        'array1',
        ['nested-array', { 'nested-conditional': true }],
        {
          'array-conditional': true,
          'array-false': false,
        },
      ],
      {
        'root-conditional': true,
      },
    )
    expect(result).toBe(
      'base array1 nested-array nested-conditional array-conditional root-conditional',
    )
  })

  it('重複する通常のクラス名を保持する（Tailwind以外）', () => {
    // tailwind-mergeはTailwindクラス以外の重複は保持する
    const result = cn('custom-class', 'another-class', 'custom-class')
    expect(result).toBe('custom-class another-class custom-class')
  })

  it('空白を含むクラス名を正しく処理する', () => {
    const result = cn('class1 class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })
})
