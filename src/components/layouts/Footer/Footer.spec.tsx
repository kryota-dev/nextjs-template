import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Footer } from './Footer'

describe('Footer', () => {
  it('should render', () => {
    render(<Footer>Copyright (c) 2025 Ryota Kaneko</Footer>)
    expect(
      screen.getByText('Copyright (c) 2025 Ryota Kaneko'),
    ).toBeInTheDocument()
  })
})
