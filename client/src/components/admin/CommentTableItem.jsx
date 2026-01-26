import React from 'react';
import { assets } from '../../assets/assets';
import { Check, Trash2, MessageCircle, User } from 'lucide-react'; // Installing lucide-react is recommended for this theme
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  // Destructuring with safety checks
  const { blog, createAt, _id, name, content, isApproved } = comment;

  const handleApprove = async () => {
    try {
      const { data } = await axios.post(`/api/admin/comment/${_id}/toggle-approval`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/admin/comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const BlogDate = new Date(createAt);

  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors group">

      {/* Content Cell */}
      <td className="px-6 py-4 align-top">
        <div className="flex gap-3">
          {/* Avatar Placeholder */}
          <div className="mt-1 h-9 w-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[var(--color-electric-blue)] flex-shrink-0">
            <User size={18} />
          </div>

          <div className="flex flex-col">
            {/* Comment Body */}
            <p className="text-zinc-200 text-sm font-medium leading-relaxed mb-1 font-mono">
              "{content}"
            </p>

            {/* Metadata (Name & Blog Title) */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="font-bold text-[var(--color-neon-red)]">{name}</span>
              <span>//</span>
              <span className="flex items-center gap-1 text-zinc-500">
                ON <span className="text-zinc-400 italic">"{blog?.title || 'UNKNOWN_OR_DELETED'}"</span>
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Date Cell */}
      <td className="px-6 py-4 align-top whitespace-nowrap text-xs font-mono text-zinc-500 uppercase">
        {BlogDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </td>

      {/* Actions Cell */}
      <td className="px-6 py-4 align-top text-right">
        <div className="flex items-center justify-end gap-3">

          {/* Approval Status/Button */}
          {!isApproved ? (
            <button
              onClick={handleApprove}
              className="p-2 rounded hover:bg-green-900/30 text-zinc-400 hover:text-green-500 transition-colors border border-transparent hover:border-green-500/50"
              title="AUTHORIZE_TRANSMISSION"
            >
              {/* Use Lucide Icon if available, else fallback to img */}
              <Check size={18} />
              {/* <img src={assets.tick_icon} className="w-5 h-5" alt="Approve" /> */}
            </button>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-green-900/20 text-green-500 border border-green-500/30">
              AUTHORIZED
            </span>
          )}

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded hover:bg-red-900/30 text-zinc-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/50"
            title="TERMINATE_TRANSMISSION"
          >
            <Trash2 size={18} />
            {/* <img src={assets.bin_icon} className="w-5 h-5" alt="Delete" /> */}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;