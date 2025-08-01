const TechStats = () => {
  return (
    <section className='bg-white py-16'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md'>
            <div className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
              &lt; 5 Min
            </div>
            <div className='text-sm text-gray-600 md:text-base'>Setup Time</div>
          </div>
          <div className='rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md'>
            <div className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
              3x Faster
            </div>
            <div className='text-sm text-gray-600 md:text-base'>
              Development
            </div>
          </div>
          <div className='rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md'>
            <div className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
              100%
            </div>
            <div className='text-sm text-gray-600 md:text-base'>Type Safe</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStats
