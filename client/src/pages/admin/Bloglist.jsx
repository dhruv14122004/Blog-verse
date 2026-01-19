import React, { useEffect, useState } from 'react';
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem.jsx';
import { Search, FileText, Plus } from 'lucide-react'; // Icons for professional look

const Bloglist = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-primary" size={28} />
            All Blogs
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and edit your existing blog posts.</p>
        </div>

        {/* Search & Add New Wrapper */}
        <div className="flex w-full md:w-auto gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search blogs..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
            </div>
            
            {/* Optional: 'Add New' Button (Good UX for List pages) */}
            {/* <button className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                <Plus size={16} /> Add Blog
            </button> */}
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th scope="col" className="px-6 py-4 font-medium">#</th>
                <th scope="col" className="px-6 py-4 font-medium">Blog Title</th>
                <th scope="col" className="px-6 py-4 font-medium">Date</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    index={index}
                    fetchBlogs={fetchBlogs}
                  />
                ))
              ) : (
                // Empty State Handling
                <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                            <FileText className="h-10 w-10 text-gray-300 mb-2" />
                            <p>No blogs found.</p>
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Optional: Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center text-sm text-gray-500">
            <p>Showing {blogs.length} entries</p>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-50">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Bloglist;