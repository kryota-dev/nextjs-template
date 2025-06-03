import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Header } from './Header'

describe('Header', () => {
  it('should render', () => {
    render(<Header />)
    expect(
      screen.getByText('Next.js Static Export Boilerplate'),
    ).toBeInTheDocument()
  })
})
