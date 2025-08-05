import { Roboto } from 'next/font/google'
import { headers } from 'next/headers'

import type { Metadata } from 'next'

import { LANGUAGE, SITE_NAME } from '@/app/constants/config'
import { HttpProvider } from '@/app/services/http'
import ILayout from '@/app/types/layout'

import FooterContainer from './components/structure/footer'
import HeaderContainer from './components/structure/header'

import '@/app/styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME}`,
  },
  description:
    'An example of a text for description meta tag for the application.',
}

const LayoutRoot = async ({ children }: ILayout) => {
  const headersList = headers()
  const nonce = (await headersList).get('x-nonce') || undefined

  return (
    <html lang={LANGUAGE}>
      <head>
        {nonce && (
          <meta
            name='csp-nonce'
            content={nonce}
          />
        )}
      </head>
      <body
        className={`${roboto.variable} font-roboto antialiased`}
        suppressHydrationWarning={true}
      >
        <HttpProvider>
          <HeaderContainer />
          <main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {children}
          </main>
          <FooterContainer />
        </HttpProvider>
      </body>
    </html>
  )
}

export default LayoutRoot
