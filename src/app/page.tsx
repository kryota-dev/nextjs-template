import { LinkButton } from '@/components/common/LinkButton'

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-[32px] sm:items-start'>
        <h1 className='text-4xl font-bold'>Hello World</h1>
        <p className='text-lg'>
          This is a boilerplate for Next.js static export.
        </p>

        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <LinkButton
            variant='primary'
            href='https://github.com/kryota-dev/nextjs-static-export-template'
          >
            GitHub
          </LinkButton>
          <LinkButton
            variant='secondary'
            href='https://deepwiki.com/kryota-dev/nextjs-static-export-template'
          >
            Ask DeepWiki
          </LinkButton>
        </div>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-[24px]'>
        <a
          className='text-sm'
          href='https://github.com/kryota-dev/nextjs-static-export-template/blob/main/LICENSE'
          target='_blank'
          rel='noopener noreferrer'
        >
          Copyright (c) 2025 Ryota Kaneko
        </a>
      </footer>
    </div>
  )
}
