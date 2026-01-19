import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'framer-motion'
import BlogCard from './Blogcard.jsx'
const Bloglist = () => {
    const [menu, setMenu] = useState("All")

    return (
        <div>
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button
                            onClick={() => setMenu(item)}
                            className={`relative px-4 py-1.5 text-sm sm:text-base font-medium rounded-full overflow-hidden
                ${menu === item ? 'text-primary' : 'text-grey-600 hover:text-primary'}`}
                        >
                            {/* Text */}
                            <span className='relative z-10'>{item}</span>

                            {/* Active background */}
                            {menu === item && (
                                <motion.div layoutId="activeBackground" transition={{ type: "spring", stiffness: 500, damping: 30 }} className='absolute inset-0 bg-primary/10 rounded-full'></motion.div>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {blog_data
                    .filter((blog) => menu === "All" || blog.category === menu)
                    .map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
            </div>

        </div>
    )
}

export default Bloglist
