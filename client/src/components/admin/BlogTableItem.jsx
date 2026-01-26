import React from 'react'
import { Eye, Pencil, Trash } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const { axios } = useAppContext()
  const navigate = useNavigate()

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '-'

  const statusLabel = blog.isPublished ? 'Published' : 'Draft'
  const statusClasses = blog.isPublished
    ? 'bg-green-100 text-green-700'
    : 'bg-yellow-100 text-yellow-700'

  const handleView = () => {
    navigate(`/blog/${blog._id}`)
  }

  const handleEdit = () => {
    // TODO: Navigate to edit page or open modal
    console.log('Edit blog:', blog._id)
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/blog/delete/${blog._id}`)
      if (data.success) {
        toast.success(data.message)
        fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleTogglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { blogId: blog._id })
      if (data.success) {
        toast.success(data.message)
        fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="hover:bg-zinc-800/50 transition-colors group border-b border-zinc-800">
      <td className="px-6 py-4 text-sm font-mono text-zinc-500">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-bold text-white tracking-tight truncate max-w-[300px]">{blog.title}</td>
      <td className="px-6 py-4 text-sm font-mono text-zinc-400 uppercase">{formattedDate}</td>
      <td className="px-6 py-4">
        <span
          onClick={handleTogglePublish}
          className={`cursor-pointer inline-flex items-center px-2 py-0.5 rounded text-xs font-black uppercase tracking-widest border ${blog.isPublished
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
