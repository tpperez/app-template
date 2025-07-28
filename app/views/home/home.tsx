import Benefits from '@/app/views/home/components/benefits'
import GetStarted from '@/app/views/home/components/get-started'
import Hero from '@/app/views/home/components/hero'
import Stack from '@/app/views/home/components/stack'
import Stats from '@/app/views/home/components/stats'

const ViewHome = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white'>
      <Hero />
      <Stats />
      <Stack />
      <Benefits />
      <GetStarted />
    </div>
  )
}

export default ViewHome
