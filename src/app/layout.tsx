import 'server-only'

import { Navigation } from '@/components/layouts/Navigation'
import '@/styles/globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Blog App',
    template: '%s | Blog App',
  },
  description: 'JSONPlaceholderを使用したブログアプリケーション',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='ja'>
      <body className='min-h-screen bg-gray-50'>
        <Navigation />
        <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {children}
        </main>
      </body>
    </html>
  )
}
