const Stack = () => {
  return (
    <section
      id='stack'
      className='bg-gradient-to-b from-gray-50 to-white px-4 py-20 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
            Technology Stack
          </h2>
          <p className='mx-auto max-w-3xl text-lg text-gray-600'>
            Modern technologies handpicked for developer productivity and
            scalable applications
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-500 hover:border-gray-300 hover:shadow-2xl'>
            <div className='absolute -right-4 -top-4 flex h-24 w-24 rotate-[20deg] items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 opacity-20 grayscale'>
              <span className='text-4xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'>
                ⚛️
              </span>
            </div>
            <div className='relative'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>Core Stack</h3>
              </div>
              <ul className='space-y-3'>
                <li className='text-gray-700'>
                  <span className='font-medium'>Next.js</span>
                </li>
                <li className='text-gray-700'>
                  <span className='font-medium'>TypeScript</span>
                </li>
                <li className='text-gray-700'>
                  <span className='font-medium'>Tailwind CSS</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-500 hover:border-gray-300 hover:shadow-2xl'>
            <div className='absolute -right-4 -top-4 flex h-24 w-24 rotate-[20deg] items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 opacity-20 grayscale'>
              <span className='text-4xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'>
                🗄️
              </span>
            </div>
            <div className='relative'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>
                  State Management
                </h3>
              </div>
              <ul className='space-y-3'>
                <li className='text-gray-700'>
                  <span className='font-medium'>TanStack Query</span>
                </li>
                <li className='text-gray-700'>
                  <span className='font-medium'>Zustand</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-500 hover:border-gray-300 hover:shadow-2xl'>
            <div className='absolute -right-4 -top-4 flex h-24 w-24 rotate-[20deg] items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 opacity-20 grayscale'>
              <span className='text-4xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'>
                📝
              </span>
            </div>
            <div className='relative'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>
                  Forms & Validation
                </h3>
              </div>
              <ul className='space-y-3'>
                <li className='text-gray-700'>
                  <span className='font-medium'>React Hook Form</span>
                </li>
                <li className='text-gray-700'>
                  <span className='font-medium'>Zod</span>
                </li>
              </ul>
            </div>
          </div>

          <div className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-500 hover:border-gray-300 hover:shadow-2xl'>
            <div className='absolute -right-4 -top-4 flex h-24 w-24 rotate-[20deg] items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 opacity-20 grayscale'>
              <span className='text-4xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'>
                🧪
              </span>
            </div>
            <div className='relative'>
              <div className='mb-6'>
                <h3 className='text-xl font-bold text-gray-900'>
                  Testing & Quality
                </h3>
              </div>
              <ul className='space-y-3'>
                <li className='text-gray-700'>
                  <span className='font-medium'>Vitest</span>
                </li>
                <li className='text-gray-700'>
                  <span className='font-medium'>Testing Library</span>
                </li>
                <li className='text-gray-700'>
                  <span className='font-medium'>ESLint + Prettier</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-16 text-center'>
          <div className='inline-flex items-center rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-4 shadow-lg'>
            <div className='mr-3 flex h-8 w-8 rotate-[20deg] items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-800 grayscale'>
              <span className='text-lg'>⚡</span>
            </div>
            <span className='font-medium text-gray-800'>
              Stack optimized for better developer experience and productivity
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stack
