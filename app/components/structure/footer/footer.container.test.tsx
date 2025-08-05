import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import FooterContainer from './footer.container'

describe('FooterContainer', () => {
  it('should render Footer', async () => {
    const { container } = render(await FooterContainer())

    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})
