import { tv } from 'tailwind-variants'

import type { PropsWithChildren } from 'react'
import type { VariantProps } from 'tailwind-variants'

const linkButtonStyles = tv({
  base: 'flex h-10 w-full items-center justify-center rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors sm:h-12 sm:w-auto sm:px-5 sm:text-base',
  variants: {
    variant: {
      primary:
        'bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]',
      secondary:
        'border-black/[.08] hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]',
    },
  },
})

type LinkButtonVariants = VariantProps<typeof linkButtonStyles>

type Props = LinkButtonVariants &
  PropsWithChildren<{
    href: string
  }>

/**
 * LinkButton Component
 * @description リンクボタンコンポーネント
 */
export const LinkButton = ({ variant = 'primary', children, href }: Props) => {
  return (
    <a
      className={linkButtonStyles({ variant })}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  )
}
