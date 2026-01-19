import React from 'react'

const NewsLetter = () => {
  return (
    <div className='my-32 px-4'>
      <div className='max-w-2xl mx-auto text-center'>
        
        <h1 className='text-2xl sm:text-3xl font-semibold mb-3'>
          Never Miss a Blog!
        </h1>

        <p className='text-sm sm:text-lg text-gray-500/70 mb-8'>
          Subscribe to our newsletter to get the latest updates directly in your inbox.
        </p>

        <form className='flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto w-full'>
          <input
            type='email'
            placeholder='Enter your email address'
            required
            className='w-full px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary'
          />

          <button
            type='submit'
            className='w-full sm:w-auto px-6 py-2 text-sm sm:text-base rounded-lg bg-primary text-white font-medium hover:opacity-90 transition'
          >
            Subscribe
          </button>
        </form>

      </div>
    </div>
  )
}

export default NewsLetter
