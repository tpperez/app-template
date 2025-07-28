const GetStarted = () => {
  return (
    <section
      id='get-started'
      className='bg-gradient-to-br from-gray-100 to-gray-50 px-4 py-20 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
          Start with the Complete Stack
        </h2>
        <p className='mb-8 text-lg text-gray-600'>
          All dependencies configured, types defined and examples included
        </p>
        <div className='mb-8 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 p-6 shadow-lg'>
          <div className='text-left'>
            <div className='mb-2 text-sm text-gray-400'>
              # Clone the template
            </div>
            <div className='font-mono text-white'>
              git clone https://github.com/user/nextjs-stack-template.git
            </div>
            <div className='mb-2 mt-4 text-sm text-gray-400'>
              # Install dependencies
            </div>
            <div className='font-mono text-white'>
              cd nextjs-stack-template && npm install
            </div>
            <div className='mb-2 mt-4 text-sm text-gray-400'>
              # Start development
            </div>
            <div className='font-mono text-white'>npm run dev</div>
          </div>
        </div>
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <button className='transform rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:to-gray-600'>
            Clone Repository
          </button>
          <button className='font-medium text-gray-700 transition-colors hover:text-gray-900'>
            View Documentation →
          </button>
        </div>
      </div>
    </section>
  )
}

export default GetStarted
