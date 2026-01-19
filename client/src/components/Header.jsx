import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='cenrtered-flex flex-col gap-6 sm:gap-10 mt-10 sm:mt-20 mb-16 text-center'>

                <div className='inline-flex items-center justify-center gap-4 px-6 py-2 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                    <p>New: Ai Feature Integrated</p>
                    <img src={assets.star_icon} className='w-2.5' alt="" />
                </div>

                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-20 text-grey-100'>
                    Your own <span className='text-primary'>blogging</span><br /> Platform
                </h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-grey-500'>
                    This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.
                </p>

                <form className='flex items-center justify-center gap-2 max-w-xl mx-auto w-full'>
                    <input
                        type="text"
                        placeholder='Search for blogs'
                        required
                        className='w-full px-4 py-2 text-sm sm:text-base rounded-lg border border-grey-300 bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary'
                    />
                    <button
                        type='submit'
                        className='cursor-pointer px-5 py-2 text-sm sm:text-base rounded-lg bg-primary text-white font-medium hover:opacity-90 transition'
                    >
                        Search
                    </button>
                </form>

            </div>

            <img
                src={assets.gradientBackground}
                alt=""
                className='absolute top-50 -z-1 opacity-50'
            />
        </div>
    )
}

export default Header
