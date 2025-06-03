import { LinkButton } from '@/components/common/LinkButton'

export default function Home() {
  return (
    <main className='flex flex-col items-start gap-[32px] p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <h1 className='text-4xl font-bold'>Hello World</h1>
      <p className='text-lg'>
        This is a boilerplate for Next.js static export.
      </p>

      <div className='flex items-center gap-4'>
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
  )
}
