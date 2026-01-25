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
        <div className="font-sans text-white">
            {/* Header & Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter text-white flex items-center gap-2">
                        <MessageSquare className="text-[var(--color-electric-blue)]" size={32} />
                        COMMENTS
                    </h1>
                </div>

                {/* Modern Segmented Control Filter */}
                <div className="bg-black p-1 border border-zinc-800 inline-flex">
                    <button
                        onClick={() => setFilter('Not Approved')}
                        className={`px-4 py-2 text-sm font-bold uppercase font-mono transition-all duration-200 flex items-center gap-2 skew-x-[-10deg]
                            ${filter === 'Not Approved'
                                ? 'bg-[var(--color-neon-red)] text-white shadow-[2px_2px_0px_white]'
                                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                            }`}
                    >
                        <Clock size={14} className="skew-x-[10deg]" />
                        <span className="skew-x-[10deg]">PENDING</span>
                    </button>
                    <button
                        onClick={() => setFilter('Approved')}
                        className={`px-4 py-2 text-sm font-bold uppercase font-mono transition-all duration-200 flex items-center gap-2 skew-x-[-10deg] ml-2
                            ${filter === 'Approved'
                                ? 'bg-[var(--color-electric-blue)] text-black shadow-[2px_2px_0px_white]'
                                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
                            }`}
                    >
                        <CheckCircle size={14} className="skew-x-[10deg]" />
                        <span className="skew-x-[10deg]">APPROVED</span>
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-black border-b border-zinc-800 text-zinc-500 text-xs uppercase font-mono tracking-wider">
                                <th scope='col' className='px-6 py-4 font-bold'>TRANSMISSION_DATA</th>
                                <th scope='col' className='px-6 py-4 font-bold'>TIMESTAMP</th>
                                <th scope='col' className='px-6 py-4 font-bold text-right'>PROTOCOL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
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
                                    <td colSpan="3" className="px-6 py-12 text-center text-zinc-500 font-mono">
                                        NO_{filter.toUpperCase().replace(' ', '_')}_MESSAGES_FOUND.
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