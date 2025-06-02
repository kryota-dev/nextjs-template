import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { GoogleTagManager as NextGTM } from '@next/third-parties/google'
import type { ComponentProps } from 'react'

vi.mock('@next/third-parties/google', () => ({
  GoogleTagManager: ({ gtmId }: ComponentProps<typeof NextGTM>) => (
    <div data-testid='gtm-script' data-gtm-id={gtmId} />
  ),
}))

afterEach(() => {
  vi.resetModules()
})

describe('GoogleTagManager', () => {
  it('GTM_IDが設定されている場合、NextGTMコンポーネントが正しくレンダリングされる', async () => {
    vi.doMock('@/config', () => ({
      NEXT_PUBLIC_GTM_ID: 'GTM-1234567890',
    }))
    const { GoogleTagManager } = await import('./GoogleTagManager')
    render(<GoogleTagManager />)

    // テストIDが存在することを確認
    expect(screen.getByTestId('gtm-script')).toBeInTheDocument()
    // GTM_IDが存在することを確認
    expect(screen.getByTestId('gtm-script')).toHaveAttribute(
      'data-gtm-id',
      'GTM-1234567890',
    )
  })

  it('GTM_IDが設定されていない場合、NextGTMコンポーネントがレンダリングされない', async () => {
    vi.doMock('@/config', () => ({
      NEXT_PUBLIC_GTM_ID: undefined,
    }))

    const { GoogleTagManager } = await import('./GoogleTagManager')
    render(<GoogleTagManager />)

    // nullが返されることを確認
    expect(screen.queryByTestId('gtm-script')).toBeNull()
  })
})

describe('GoogleTagManagerNoscript', () => {
  it('GTM_IDが設定されている場合、noscriptタグが正しくレンダリングされる', async () => {
    vi.doMock('@/config', () => ({
      NEXT_PUBLIC_GTM_ID: 'GTM-1234567890',
    }))

    const { GoogleTagManagerNoscript } = await import('./GoogleTagManager')
    render(<GoogleTagManagerNoscript />)

    // テストIDが存在することを確認
    expect(screen.getByTestId('gtm-noscript')).toBeInTheDocument()
    // GTM_IDが存在することを確認
    expect(screen.getByTestId('gtm-noscript')).toHaveAttribute(
      'data-test-gtm-id',
      'GTM-1234567890',
    )
  })

  it('GTM_IDが設定されていない場合、noscriptタグがレンダリングされない', async () => {
    vi.doMock('@/config', () => ({
      NEXT_PUBLIC_GTM_ID: undefined,
    }))

    const { GoogleTagManagerNoscript } = await import('./GoogleTagManager')
    render(<GoogleTagManagerNoscript />)

    expect(screen.queryByTestId('gtm-noscript')).toBeNull()
  })
})
