import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
const Sidebar = () => {
  return (
    <div className='flex flex-col h-screen sticky top-0 p-4 md:p-6 bg-white/80 backdrop-blur border-r border-gray-200 space-y-2'>
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary'
            : 'group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100'
        }
      >
        <img src={assets.home_icon} alt="" className='min-w-5 w-5 h-5'/>
        <p className='hidden md:inline-block font-medium'>Home</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/addblog"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary'
            : 'group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100'
        }
      >
        <img src={assets.add_icon} alt="" className='min-w-5 w-5 h-5'/>
        <p className='hidden md:inline-block font-medium'>Add Blog</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/listblog"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary'
            : 'group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100'
        }
      >
        <img src={assets.list_icon} alt="" className='min-w-5 w-5 h-5'/>
        <p className='hidden md:inline-block font-medium'>List Blog</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/comments"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary'
            : 'group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100'
        }
      >
        <img src={assets.comment_icon} alt="" className='min-w-5 w-5 h-5'/>
        <p className='hidden md:inline-block font-medium'>Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
