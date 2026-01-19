import React from 'react'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='mt-24 border-t border-gray-200'>
      <div className='max-w-6xl mx-auto px-4 py-10'>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 items-start'>


          <div className='sm:col-span-1 text-center sm:text-left'>
            <h2 className='text-lg font-semibold text-gray-900'>YourBlog</h2>
            <p className='mt-2 text-sm text-gray-500 max-w-xs mx-auto sm:mx-0'>
              A simple place to read, write, and share ideas that matter.
            </p>
          </div>

          <div className='sm:col-span-2 flex justify-center sm:justify-end gap-16'>
            {footer_data.map((section, index) => (
              <div key={index} className='text-center sm:text-left'>
                <h3 className='text-sm font-medium text-gray-900 mb-3'>
                  {section.title}
                </h3>
                <ul className='space-y-2 text-sm text-gray-500'>
                  {section.links.map((link, idx) => (
                    <li
                      key={idx}
                      className='cursor-pointer hover:text-primary transition'
                    >
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className='mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500'>
          © {new Date().getFullYear()} YourBlog. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer
