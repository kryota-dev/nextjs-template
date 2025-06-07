'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SITE_NAME } from '@/constants'

/**
 * Header Component
 * @description アクセシブルなナビゲーションヘッダー
 */
export const Header = () => {
  const pathname = usePathname()

  /**
   * 現在のページかどうかを判定
   * @param href リンクのhref
   * @returns 現在のページかどうか
   */
  const isCurrentPage = (href: string): boolean => {
    // pathnameがnullまたはundefinedの場合は、現在ページとして扱わない
    if (!pathname) {
      return false
    }

    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  /**
   * aria-current属性の値を取得
   * @param href リンクのhref
   * @returns aria-current属性の値
   */
  const getAriaCurrent = (href: string): 'page' | undefined => {
    return isCurrentPage(href) ? 'page' : undefined
  }

  /**
   * ナビゲーションリンクのスタイルを取得
   * @param href リンクのhref
   * @returns CSSクラス名
   */
  const getNavLinkClassName = (href: string): string => {
    const baseClasses =
      'rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    const currentClasses = 'bg-blue-100 text-blue-900'
    const defaultClasses = 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'

    return `${baseClasses} ${isCurrentPage(href) ? currentClasses : defaultClasses}`
  }

  return (
    <header className='border-b bg-white shadow-sm'>
      <nav
        className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
        role='navigation'
        aria-label='メインナビゲーション'
      >
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <h1 className='flex flex-shrink-0 items-center'>
              <Link
                href='/'
                className='rounded-md px-2 py-1 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                aria-label={`${SITE_NAME} - ホームページへ移動`}
              >
                {SITE_NAME}
              </Link>
            </h1>
            <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8'>
              <Link
                href='/'
                className={getNavLinkClassName('/')}
                aria-current={getAriaCurrent('/')}
              >
                ホーム
              </Link>
              <Link
                href='/news'
                className={getNavLinkClassName('/news')}
                aria-current={getAriaCurrent('/news')}
              >
                ニュース
              </Link>
              <Link
                href='/profiles'
                className={getNavLinkClassName('/profiles')}
                aria-current={getAriaCurrent('/profiles')}
              >
                プロフィール
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
