import type { PropsWithChildren } from 'react'

/**
 * Footer Component
 * @description Example Component
 */
export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer className='row-start-3 mt-auto flex flex-wrap items-center justify-center gap-[24px] p-8'>
      {children}
    </footer>
  )
}
