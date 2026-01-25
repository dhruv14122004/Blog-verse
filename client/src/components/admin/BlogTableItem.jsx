import React from 'react'
import { Eye, Pencil, Trash } from 'lucide-react'

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '-'

  const statusLabel = blog.isPublished ? 'Published' : 'Draft'
  const statusClasses = blog.isPublished
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'

  const handleView = () => {
    // TODO: Navigate to blog detail if needed
    console.log('View blog:', blog._id)
  }

  const handleEdit = () => {
    // TODO: Navigate to edit page or open modal
    console.log('Edit blog:', blog._id)
  }

  const handleDelete = () => {
    // TODO: Delete action (confirm + API). For now, refresh list.
    console.log('Delete blog:', blog._id)
    if (typeof fetchBlogs === 'function') fetchBlogs()
  }

  return (
    <tr className="hover:bg-zinc-800/50 transition-colors group border-b border-zinc-800">
      <td className="px-6 py-4 text-sm font-mono text-zinc-500">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-bold text-white tracking-tight truncate max-w-[300px]">{blog.title}</td>
      <td className="px-6 py-4 text-sm font-mono text-zinc-400 uppercase">{formattedDate}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-black uppercase tracking-widest border ${blog.isPublished
            ? 'bg-green-900/20 text-green-500 border-green-500/50'
            : 'bg-yellow-900/20 text-yellow-500 border-yellow-500/50'
          }`}>
          {statusLabel}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center gap-2">
          <button
            onClick={handleView}
            className="p-2 text-zinc-400 hover:text-[var(--color-electric-blue)] hover:bg-zinc-800 rounded transition-colors"
            title="VIEW_FILE"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={handleEdit}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
            title="EDIT_FILE"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-zinc-400 hover:text-[var(--color-neon-red)] hover:bg-zinc-800 rounded transition-colors"
            title="DELETE_FILE"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BlogTableItem
