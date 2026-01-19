import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react'; // Icons for better UI

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [filter, setFilter] = useState('Not Approved');

    const fetchComments = () => {
        // Fetch comments based on the filter
        setComments(comments_data)
    }

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header & Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <MessageSquare className="text-primary" size={24} />
                        Comments
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and moderate user comments.</p>
                </div>

                {/* Modern Segmented Control Filter */}
                <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm inline-flex">
                    <button
                        onClick={() => setFilter('Not Approved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                            ${filter === 'Not Approved'
                                ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-200 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Clock size={14} />
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter('Approved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                            ${filter === 'Approved'
                                ? 'bg-green-50 text-green-600 ring-1 ring-green-200 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <CheckCircle size={14} />
                        Approved
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                                <th scope='col' className='px-6 py-4 font-medium'>Blog title & Comments</th>
                                <th scope='col' className='px-6 py-4 font-medium'>Date</th>
                                <th scope='col' className='px-6 py-4 font-medium text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {comments.filter((comment) => {
                                if (filter === "Approved") return comment.isApproved === true;
                                return comment.isApproved === false;
                            }).map((comment, index) => (
                                <CommentTableItem 
                                    key={comment.id} 
                                    comment={comment} 
                                    index={index + 1} 
                                    fetchComments={fetchComments} 
                                />
                            ))}
                            
                            {/* Optional: Empty State if no comments exist for the filter */}
                            {comments.filter(c => filter === "Approved" ? c.isApproved : !c.isApproved).length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-10 text-center text-gray-400 text-sm">
                                        No {filter.toLowerCase()} comments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Comments