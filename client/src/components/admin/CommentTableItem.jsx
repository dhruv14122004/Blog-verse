import React from 'react';
import { assets } from '../../assets/assets';
import { Check, Trash2, MessageCircle, User } from 'lucide-react'; // Installing lucide-react is recommended for this theme

const CommentTableItem = ({ comment, fetchComments }) => {
  // Destructuring with safety checks
  const { blog, createAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createAt);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      
      {/* Content Cell */}
      <td className="px-6 py-4 align-top">
        <div className="flex gap-3">
          {/* Avatar Placeholder */}
          <div className="mt-1 h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0">
            <User size={18} />
          </div>

          <div className="flex flex-col">
            {/* Comment Body */}
            <p className="text-gray-800 text-sm font-medium leading-relaxed mb-1">
              "{content}"
            </p>
            
            {/* Metadata (Name & Blog Title) */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-600">{name}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gray-400">
                 on <span className="text-gray-600 italic">"{blog?.title || 'Unknown Blog'}"</span>
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Date Cell */}
      <td className="px-6 py-4 align-top whitespace-nowrap text-sm text-gray-500">
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
                className="p-2 rounded-lg text-green-600 bg-green-50 border border-green-100 hover:bg-green-100 transition-colors"
                title="Approve Comment"
            >
                {/* Use Lucide Icon if available, else fallback to img */}
                <Check size={18} />
                {/* <img src={assets.tick_icon} className="w-5 h-5" alt="Approve" /> */}
            </button>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
               Approved
            </span>
          )}

          {/* Delete Button */}
          <button 
            className="p-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            title="Delete Comment"
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