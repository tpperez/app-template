import Logo from '@/app/components/ui/logo'

const Footer = () => {
  return (
    <footer className='bg-black bg-gradient-to-r py-12 text-white'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-10 md:grid-cols-3'>
          <div>
            <Logo
              variant='light'
              text='App Template'
              className='mb-4'
            />
            <p className='text-gray-300'>
              Next.js based template with modern stack and production-ready
              setup
            </p>
          </div>

          <div>
            <h3 className='mb-4 font-semibold'>Developer Resources</h3>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a
                  href='#stack'
                  className='transition-colors hover:text-white'
                >
                  Stack Documentation
                </a>
              </li>
              <li>
                <a
                  href='#get-started'
                  className='transition-colors hover:text-white'
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href='#benefits'
                  className='transition-colors hover:text-white'
                >
                  Stack Benefits
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-semibold'>Navigation</h3>
            <ul className='space-y-2 text-gray-300'>
              <li>
                <a
                  href='#stack'
                  className='transition-colors hover:text-white'
                >
                  Technology Stack
                </a>
              </li>
              <li>
                <a
                  href='#benefits'
                  className='transition-colors hover:text-white'
                >
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href='#get-started'
                  className='transition-colors hover:text-white'
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-gray-700 pt-8 text-center text-gray-400'>
          <p className='mb-1'>&copy; 2025 App Template</p>
          <p>built for developers, by developers.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
