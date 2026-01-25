import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, PlusSquare, List, MessageSquare } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='flex flex-col min-h-screen w-20 md:w-64 sticky top-0 py-6 px-4 bg-black border-r border-zinc-800 space-y-4'>
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 bg-zinc-900 border-l-4 border-[var(--color-neon-red)] text-white transition-all'
            : 'group flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all border-l-4 border-transparent'
        }
      >
        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <p className='hidden md:inline-block font-mono font-bold tracking-tight'>DASHBOARD</p>
      </NavLink>

      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 bg-zinc-900 border-l-4 border-[var(--color-neon-red)] text-white transition-all'
            : 'group flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all border-l-4 border-transparent'
        }
      >
        <PlusSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <p className='hidden md:inline-block font-mono font-bold tracking-tight'>ADD_BLOG</p>
      </NavLink>

      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 bg-zinc-900 border-l-4 border-[var(--color-neon-red)] text-white transition-all'
            : 'group flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all border-l-4 border-transparent'
        }
      >
        <List className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <p className='hidden md:inline-block font-mono font-bold tracking-tight'>ALL_BLOGS</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          isActive
            ? 'group flex items-center gap-3 px-4 py-3 bg-zinc-900 border-l-4 border-[var(--color-neon-red)] text-white transition-all'
            : 'group flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 transition-all border-l-4 border-transparent'
        }
      >
        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <p className='hidden md:inline-block font-mono font-bold tracking-tight'>COMMENTS</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
