import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { LinkButton } from './LinkButton'

describe('LinkButton', () => {
  it('should render', () => {
    render(<LinkButton href='https://example.com'>LinkButton</LinkButton>)
    expect(screen.getByText('LinkButton')).toBeInTheDocument()
  })
})
