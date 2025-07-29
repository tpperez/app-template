const Benefits = () => {
  return (
    <section
      id='benefits'
      className='bg-white py-20'
    >
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
            Why Choose This Stack?
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            Real business benefits that matter to your project success
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          <div className='flex items-start space-x-4 rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6 transition-all duration-300 hover:shadow-lg'>
            <div className='flex-shrink-0'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-2xl grayscale'>
                ⚡
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                Faster Development
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Reduce boilerplate and setup time by 70%. Start building
                features immediately with pre-configured tools.
              </p>
            </div>
          </div>

          <div className='flex items-start space-x-4 rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6 transition-all duration-300 hover:shadow-lg'>
            <div className='flex-shrink-0'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-2xl grayscale'>
                🛡️
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                Production Stability
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Type safety and comprehensive testing catch bugs before
                deployment, reducing production issues by 80%.
              </p>
            </div>
          </div>

          <div className='flex items-start space-x-4 rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6 transition-all duration-300 hover:shadow-lg'>
            <div className='flex-shrink-0'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-2xl grayscale'>
                🤝
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                Team Productivity
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Consistent code standards and modern tooling enable teams to
                collaborate efficiently and onboard faster.
              </p>
            </div>
          </div>

          <div className='flex items-start space-x-4 rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6 transition-all duration-300 hover:shadow-lg'>
            <div className='flex-shrink-0'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-2xl grayscale'>
                📈
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                Scalable Architecture
              </h3>
              <p className='leading-relaxed text-gray-600'>
                Built for growth - from prototype to enterprise scale without
                major refactoring or architecture changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
