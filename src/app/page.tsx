export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <main className='row-start-2 flex flex-col items-center gap-[32px] sm:items-start'>
        <h1 className='text-4xl font-bold'>Hello World</h1>
        <p className='text-lg'>This is a template for Next.js static export.</p>

        <div className='flex flex-col items-center gap-4 sm:flex-row'>
          <a
            className='bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]'
            href='https://github.com/kryota-dev/nextjs-static-export-template'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
          <a
            className='flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]'
            href='https://deepwiki.com/kryota-dev/nextjs-static-export-template'
            target='_blank'
            rel='noopener noreferrer'
          >
            Ask DeepWiki
          </a>
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
