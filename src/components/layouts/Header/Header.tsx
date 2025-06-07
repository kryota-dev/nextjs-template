import Link from 'next/link'

import { SITE_NAME } from '@/constants'

/**
 * Header Component
 * @description Example Component
 */
export const Header = () => {
  return (
    <header className='border-b bg-white shadow-sm'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <h1 className='flex flex-shrink-0 items-center'>
              <Link
                href='/'
                className='text-xl font-bold text-gray-900 transition-colors hover:text-blue-600'
              >
                {SITE_NAME}
              </Link>
            </h1>
            <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8'>
              <Link
                href='/'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600'
              >
                ホーム
              </Link>
              <Link
                href='/news'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600'
              >
                ニュース
              </Link>
              <Link
                href='/profiles'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600'
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
