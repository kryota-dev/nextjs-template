import 'server-only'

import { HomePagePresentation } from './presentation'

import type { ComponentProps } from 'react'

// Example data
const presentationProps = {
  title: 'Hello World',
  description: 'This is a boilerplate for Next.js static export.',
  links: [
    {
      label: 'GitHub',
      href: 'https://github.com/kryota-dev/nextjs-static-export-template',
      variant: 'primary',
    },
    {
      label: 'Ask DeepWiki',
      href: 'https://deepwiki.com/kryota-dev/nextjs-static-export-template',
      variant: 'secondary',
    },
  ],
} as const satisfies ComponentProps<typeof HomePagePresentation>

/**
 * HomePageContainer
 * @description Server Components上でのデータフェッチなどのサーバーサイド処理を行うコンテナコンポーネント
 */
export const HomePageContainer = () => {
  return <HomePagePresentation {...presentationProps} />
}
