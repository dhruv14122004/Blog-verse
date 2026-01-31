import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addXP } from '../features/user/userSlice';
import { toggleFocusMode } from '../features/ui/uiSlice';
import SpiderNavbar from '../components/navigation/SpiderNavbar';
import ComicCover from '../components/blog/ComicCover';
import { motion, AnimatePresence } from 'framer-motion';
import Moment from 'moment';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const PostHeader = ({ date, author, category, isFocusMode, onToggleFocus }) => (
  <div className="flex flex-wrap items-center gap-4 my-8 font-mono border-b-2 border-dashed border-gray-700 pb-4 text-[var(--color-web-white)] justify-between">
    <div className="flex items-center gap-4">
      <span className="bg-[var(--color-electric-blue)] text-black px-3 py-1 text-sm font-bold -rotate-1 shadow-[2px_2px_0px_red]">
        {category || 'TECH'}
      </span>
      <span className="text-zinc-400 text-sm hidden sm:inline">
            // {Moment(date).format('MMM DD, YYYY').toUpperCase()}
      </span>
      <span className="text-[var(--color-neon-red)] font-bold text-sm hidden sm:inline">
        AUTH: {author ? author.toUpperCase() : 'UNKNOWN'}
      </span>
    </div>

    <button
      onClick={onToggleFocus}
      className={`px-3 py-1 font-bold text-xs uppercase tracking-widest border transition-all ${isFocusMode ? 'bg-white text-black border-white' : 'border-zinc-600 text-zinc-400 hover:text-white'}`}
    >
      {isFocusMode ? 'EXIT_FOCUS' : 'READING_MODE'}
    </button>
  </div>
);

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isFocusMode = useSelector((state) => state.ui.isFocusMode);
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  // Comment Form State
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get('/api/blog/' + id);
      if (data.success) {
        setData(data.blog);
        dispatch(addXP(5));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/blog/comment/' + id);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error("Failed to load comments");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    try {
      const { data } = await axios.post('/api/blog/comment/' + id, { authorName, content: commentText });
      if (data.success) {
        toast.success(data.message);
        fetchComments(); // Refresh comments
        setAuthorName('');
        setCommentText('');
        dispatch(addXP(2)); // XP for commenting
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!data) return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[var(--color-electric-blue)] border-t-[var(--color-neon-red)] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`min-h-screen relative transition-colors duration-500 bg-black text-[var(--color-web-white)] font-sans`}>
      <SpiderNavbar />

      {/* Dynamic Layout Container */}
      <div className={`mx-auto px-4 pt-32 pb-8 transition-all duration-500 ${isFocusMode ? 'max-w-4xl' : 'max-w-6xl'}`}>

        {/* LEFT COLUMN: Content */}
        <main>
          {/* Show/Hide Hero Image based on focus mode */}
          {!isFocusMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ComicCover title={data.title} image={data.image} />
            </motion.div>
          )}

          {/* Header with Title in Focus Mode since Cover is hidden */}
          {isFocusMode && (
            <h1 className="text-5xl md:text-7xl font-black mb-12 text-white tracking-tighter">{data.title}</h1>
          )}

          <PostHeader
            date={data.createdAt}
            author="Dhruv"
            category={data.category}
            isFocusMode={isFocusMode}
            onToggleFocus={() => dispatch(toggleFocusMode())}
          />

          <article className={`prose prose-invert prose-xl max-w-none 
            prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight prose-headings:mb-6 prose-headings:mt-12
            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-xl prose-p:mb-6
            prose-strong:text-white prose-strong:font-black
            prose-li:text-zinc-300 prose-li:marker:text-[var(--color-neon-red)]
            prose-a:text-[var(--color-electric-blue)] prose-a:no-underline prose-a:border-b-2 prose-a:border-[var(--color-neon-red)] hover:prose-a:bg-[var(--color-neon-red)] hover:prose-a:text-white transition-all
            prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-neon-red)] prose-blockquote:bg-zinc-900/50 prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-zinc-200
            prose-pre:bg-[#111] prose-pre:border prose-pre:border-zinc-800
            prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-zinc-800
            transition-opacity ${isFocusMode ? 'opacity-90' : 'opacity-100'}`}>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </article>

          {/* Comments */}
          {!isFocusMode && (
            <div className='mt-20 border-t-4 border-zinc-900 pt-10'>
              <h2 className='text-4xl font-black mb-8 italic'>COMMENTS_LOG <span className='text-[var(--color-neon-red)] text-2xl'>({comments.length})</span></h2>

              {/* Comment Form */}
              <form onSubmit={addComment} className="mb-12 bg-zinc-900/50 p-6 border border-zinc-800">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="CODENAME"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    className="bg-black border border-zinc-700 p-3 outline-none focus:border-[var(--color-electric-blue)] text-white font-mono"
                  />
                </div>
                <textarea
                  placeholder="INPUT_TRANSMISSION..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  className="w-full bg-black border border-zinc-700 p-3 h-32 outline-none focus:border-[var(--color-electric-blue)] text-white font-mono mb-4 resize-none"
                ></textarea>
                <button type="submit" className="bg-[var(--color-electric-blue)] text-white px-8 py-3 font-bold hover:bg-blue-600 transition-colors skew-x-[-10deg]">
                  TRANSMIT
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className='bg-zinc-900/30 border-l-2 border-[var(--color-glitch-purple)] p-6'
                  >
                    <div className='flex justify-between items-baseline mb-2 font-mono text-xs text-zinc-500'>
                      <span className='text-[var(--color-neon-red)] font-bold text-sm'>{comment.authorName?.toUpperCase() || 'ANONYMOUS'}</span>
                      <span>{Moment(comment.createdAt).fromNow().toUpperCase()}</span>
                    </div>
                    <p className='text-zinc-300'>{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>


      </div>
    </div>
  )
}

export default Blog;
