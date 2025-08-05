import type { Metadata } from 'next'

import ViewHome from '@/app/views/home'

import { MOCK_HOME_DATA } from './page.const'

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is home page of the application.',
}

const PageHome = async () => {
  const { home } = MOCK_HOME_DATA

  return <ViewHome data={home} />
}

export default PageHome
