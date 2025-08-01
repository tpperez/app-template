import { Roboto } from 'next/font/google'

import type { Metadata } from 'next'

import { LANGUAGE } from '@/app/constants/config'
import { HttpProvider } from '@/app/services/http'
import ILayout from '@/app/types/layout'

import Footer from './components/structure/footer'
import Header from './components/structure/header'

import '@/app/styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Base Template',
    default: 'Next.js Base Template',
  },
  description: 'Here you can find our defitions and examples.',
}

const LayoutRoot = ({ children }: ILayout) => {
  return (
    <html lang={LANGUAGE}>
      <body
        className={`${roboto.variable} font-roboto antialiased`}
        suppressHydrationWarning={true}
      >
        <HttpProvider>
          <Header />
          {children}
          <Footer />
        </HttpProvider>
      </body>
    </html>
  )
}

export default LayoutRoot
