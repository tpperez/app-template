import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Logo from './logo'

describe('Logo Component', () => {
  it('should apply base classes correctly', () => {
    const { container } = render(
      <Logo
        variant='dark'
        text='Test Logo'
      />,
    )
    const logoElement = container.firstChild

    // check base classes
    expect(logoElement).toHaveClass(
      'inline-flex',
      'shrink-0',
      'items-center',
      'gap-3',
    )
  })

  it('should apply custom className when provided', () => {
    const customClass = 'custom-logo-class'
    const { container } = render(
      <Logo
        variant='dark'
        text='Custom Logo'
        className={customClass}
      />,
    )
    const logoElement = container.firstChild

    expect(logoElement).toHaveClass(customClass)
  })

  it('should render with both variant options', () => {
    const { rerender } = render(
      <Logo
        variant='dark'
        text='Test'
      />,
    )
    expect(screen.getByText('Test')).toBeInTheDocument()

    rerender(
      <Logo
        variant='light'
        text='Test'
      />,
    )
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
