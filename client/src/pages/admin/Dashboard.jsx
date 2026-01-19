import React, { useEffect, useState } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { FileText, MessageCircle, FileEdit, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchdashboardData = async () => {
    // Simulating async fetch
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchdashboardData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, here is what's happening with your blog today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Blogs Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Blogs</p>
            <h3 className="text-3xl font-bold text-gray-800">{dashboardData.blogs}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <FileText size={24} />
          </div>
        </div>

        {/* Comments Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Comments</p>
            <h3 className="text-3xl font-bold text-gray-800">{dashboardData.comments}</h3>
          </div>
          <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <MessageCircle size={24} />
          </div>
        </div>

        {/* Drafts Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Drafts</p>
            <h3 className="text-3xl font-bold text-gray-800">{dashboardData.drafts}</h3>
          </div>
          <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <FileEdit size={24} />
          </div>
        </div>
      </div>

      {/* Recent Blogs Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary h-5 w-5" />
            <h2 className="text-lg font-semibold text-gray-800">Latest Blogs</h2>
          </div>
          <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th scope="col" className="px-6 py-4 font-medium">#</th>
                <th scope="col" className="px-6 py-4 font-medium">Blog Title</th>
                <th scope="col" className="px-6 py-4 font-medium">Date</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
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