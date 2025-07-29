'use client'

import { useState } from 'react'

import Logo from '@/app/components/ui/logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          <Logo
            variant='dark'
            text='App Template'
          />

          <nav className='hidden space-x-8 lg:flex'>
            <a
              href='#stack'
              className='text-gray-600 transition-colors hover:text-gray-900'
            >
              Stack
            </a>
            <a
              href='#benefits'
              className='text-gray-600 transition-colors hover:text-gray-900'
            >
              Benefits
            </a>
            <a
              href='#get-started'
              className='text-gray-600 transition-colors hover:text-gray-900'
            >
              Get Started
            </a>
          </nav>

          <button
            className='text-gray-600 lg:hidden'
            onClick={() => {
              return setIsMenuOpen(!isMenuOpen)
            }}
          >
            <div className='relative flex h-6 w-6 flex-col items-center justify-center'>
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='border-b border-gray-200 bg-white/90 py-4 shadow-lg backdrop-blur-md lg:hidden'>
          <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
            <nav className='flex flex-col space-y-4'>
              <a
                href='#stack'
                className='text-gray-600 transition-colors hover:text-gray-900'
                onClick={() => {
                  return setIsMenuOpen(false)
                }}
              >
                Stack
              </a>
              <a
                href='#benefits'
                className='text-gray-600 transition-colors hover:text-gray-900'
                onClick={() => {
                  return setIsMenuOpen(false)
                }}
              >
                Benefits
              </a>
              <a
                href='#get-started'
                className='text-gray-600 transition-colors hover:text-gray-900'
                onClick={() => {
                  return setIsMenuOpen(false)
                }}
              >
                Get Started
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
