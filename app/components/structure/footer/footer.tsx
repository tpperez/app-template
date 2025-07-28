const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-900 to-gray-800 py-12 text-white'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-3'>
          <div>
            <div className='mb-4 flex items-center'>
              <div className='mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-white to-gray-200'>
                <span className='text-sm font-bold text-gray-900'>TS</span>
              </div>
              <span className='text-xl font-bold'>Next.js Stack</span>
            </div>
            <p className='text-gray-300'>
              TypeScript template with modern stack and production-ready setup
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

        <div className='mt-8 border-t border-gray-700 pt-8 text-center text-gray-400'>
          <p>
            &copy; 2025 Next.js Stack Template. Built for developers, by
            developers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
