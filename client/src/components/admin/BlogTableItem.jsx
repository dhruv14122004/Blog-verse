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
    <tr className="hover:bg-gray-50/60">
      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 truncate max-w-[300px]">{blog.title}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{formattedDate}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusClasses} border-transparent`}>
          {statusLabel}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center gap-2">
          <button
            onClick={handleView}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
            aria-label="View"
          >
            <Eye className="h-4 w-4"/>
            View
          </button>
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4"/>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash className="h-4 w-4"/>
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BlogTableItem
