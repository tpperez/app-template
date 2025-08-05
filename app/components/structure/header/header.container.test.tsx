import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import HeaderContainer from './header.container'

describe('HeaderContainer', () => {
  it('should render Header', async () => {
    const { container } = render(await HeaderContainer())

    expect(container.querySelector('header')).toBeInTheDocument()
  })
})
