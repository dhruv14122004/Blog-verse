import React, { useEffect, useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem.jsx';
import { Search, FileText, Plus } from 'lucide-react'; // Icons for professional look
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Bloglist = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/all');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="font-sans text-white">

      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white flex items-center gap-2">
            <FileText className="text-[var(--color-neon-red)]" size={32} />
            ALL_BLOGS
          </h1>
        </div>

        {/* Search & Add New Wrapper */}
        <div className="flex w-full md:w-auto gap-3">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="SEARCH_DATABASE..."
              className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-800 rounded text-sm text-white font-mono focus:outline-none focus:border-[var(--color-neon-red)] transition-colors placeholder:text-zinc-600"
            />
          </div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-zinc-500 text-xs font-mono uppercase tracking-wider border-b border-zinc-800">
                <th scope="col" className="px-6 py-4 font-bold">#ID</th>
                <th scope="col" className="px-6 py-4 font-bold">BLOG_TITLE</th>
                <th scope="col" className="px-6 py-4 font-bold">TIMESTAMP</th>
                <th scope="col" className="px-6 py-4 font-bold">STATUS</th>
                <th scope="col" className="px-6 py-4 font-bold text-right">COMMANDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
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
                  <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 font-mono">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-zinc-700 mb-4" />
                      <p>NO_DATA_FOUND_IN_SECTOR_7</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Optional: Pagination Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-black/40 flex justify-between items-center text-xs font-mono text-zinc-500 uppercase">
          <p>SHOWING {blogs.length} RECORDS</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-zinc-700 rounded bg-black hover:bg-zinc-800 hover:text-white disabled:opacity-50 transition-colors">PREV_PAGE</button>
            <button className="px-3 py-1 border border-zinc-700 rounded bg-black hover:bg-zinc-800 hover:text-white transition-colors">NEXT_PAGE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bloglist;