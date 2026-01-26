import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { FileText, MessageCircle, FileEdit, TrendingUp } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchdashboardData = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchdashboardData();
  }, []);

  return (
    <div className="font-sans text-white">
      {/* Header */}
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">DASHBOARD</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Blogs Card */}
        <div className="bg-zinc-900 p-6 border-l-4 border-[var(--color-neon-red)] shadow-lg hover:bg-zinc-800 transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase">TOTAL_ARCHIVES</p>
              <h3 className="text-4xl font-black text-white group-hover:text-[var(--color-neon-red)] transition-colors">{dashboardData.blogs}</h3>
            </div>
            <div className="p-3 bg-black rounded-lg text-[var(--color-neon-red)] border border-zinc-800">
              <FileText size={24} />
            </div>
          </div>
        </div>

        {/* Comments Card */}
        <div className="bg-zinc-900 p-6 border-l-4 border-[var(--color-electric-blue)] shadow-lg hover:bg-zinc-800 transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase">INTERCEPTIONS</p>
              <h3 className="text-4xl font-black text-white group-hover:text-[var(--color-electric-blue)] transition-colors">{dashboardData.comments}</h3>
            </div>
            <div className="p-3 bg-black rounded-lg text-[var(--color-electric-blue)] border border-zinc-800">
              <MessageCircle size={24} />
            </div>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="bg-zinc-900 p-6 border-l-4 border-yellow-500 shadow-lg hover:bg-zinc-800 transition-colors group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase">PENDING_FILES</p>
              <h3 className="text-4xl font-black text-white group-hover:text-yellow-500 transition-colors">{dashboardData.drafts}</h3>
            </div>
            <div className="p-3 bg-black rounded-lg text-yellow-500 border border-zinc-800">
              <FileEdit size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table Section */}
      <div className="bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-[var(--color-neon-red)] h-5 w-5" />
            <h2 className="text-xl font-black italic tracking-tight text-white">RECENT_ACTIVITY</h2>
          </div>
          <button className="text-xs font-mono text-[var(--color-electric-blue)] hover:text-white transition-colors uppercase border border-[var(--color-electric-blue)] px-3 py-1 hover:bg-[var(--color-electric-blue)] hover:bg-opacity-20">
            VIEW_ALL_LOGS
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-zinc-500 text-xs font-mono uppercase tracking-wider border-b border-zinc-800">
                <th scope="col" className="px-6 py-4 font-bold">#ID</th>
                <th scope="col" className="px-6 py-4 font-bold">FILE_NAME</th>
                <th scope="col" className="px-6 py-4 font-bold">TIMESTAMP</th>
                <th scope="col" className="px-6 py-4 font-bold">STATUS</th>
                <th scope="col" className="px-6 py-4 font-bold text-right">COMMANDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  index={index}
                  fetchBlogs={fetchdashboardData}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;