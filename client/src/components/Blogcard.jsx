import React from 'react'
import { useNavigate } from 'react-router-dom'
const BlogCard = ({blog}) => {
  const {title , description, category, image, _id} = blog;
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300'>
      <img src={image} alt={title} className='aspect-video'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{
          "__html" : description.slice(0,150) + "..."
        }}></p>

      </div>
    </div>
  )
}

export default BlogCard
