import { LinkButton } from '@/components/common/LinkButton'

import type { ComponentProps } from 'react'

type Props = {
  title: string
  description: string
  links: {
    label: string
    href: string
    variant: ComponentProps<typeof LinkButton>['variant']
  }[]
}

/**
 * HomePagePresentation
 * @description Shared Components or Client Components
 */
export const HomePagePresentation = ({ title, description, links }: Props) => {
  return (
    <main className='flex flex-col items-start gap-[32px] p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <h2 className='text-4xl font-bold'>{title}</h2>
      <p className='text-lg'>{description}</p>
      <div className='flex items-center gap-4'>
        {links.map((link) => (
          <LinkButton key={link.label} variant={link.variant} href={link.href}>
            {link.label}
          </LinkButton>
        ))}
      </div>
    </main>
  )
}
