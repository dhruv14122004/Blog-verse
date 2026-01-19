import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { assets, blog_data, comments_data } from '../assets/assets'
import { useEffect } from 'react'
import Footer from '../components/Footer.jsx'

import Moment from 'moment'
const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const fetchBlogData = async () => {
    const data = blog_data.find((blog) => blog._id === id);
    setData(data);
  }

  const fetchComments = async () => {
    setComments(comments_data);
  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const addComment = (e) => {
    e.preventDefault();
    const name = author.trim();
    const content = commentText.trim();
    if (!name || !content) return;
    const newComment = {
      name,
      content,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setAuthor('');
    setCommentText('');
  };

  return data ? (
    <div className='min-h-screen relative'>
      {/* <img src={assets.gradientBackground} alt="" className='absolute top-50 -z-1 opacity-50'/> */}
      <Navbar />
      <div className='text-center mt-20 bg-white rounded-md text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published On : {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-3xl font-semibold sm:text-6xl max-w-4xl mx-auto text-gray-700'>{data.title}</h1>
        <h2 className='my-4 text-xl max-w-4xl mx-auto text-gray-600'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 text-primary rounded-full mb-4 border border-primary bg-primary/10 font-medium'>Dhruv Sharma</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt={data.title} className="max-w-4xl mx-auto rounded-4xl" />
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}>
        </div>
        {/* comments Section */}

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <h2 className='text-2xl font-semibold mb-6 text-gray-700'>Comments ({comments.length})</h2>
          {comments.map((comment, index) => (
            <div key={index} className='bg-primary/5 border border-gray-300 rounded-lg p-4 mb-6 text-gray-700'>
              <div className='flex items-start gap-3'>
                <img src={assets.user_icon} alt={comment.name} className='w-10 h-10 rounded-full object-cover shrink-0' />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-baseline justify-between'>
                    <p className='font-medium text-gray-800'>{comment.name}</p>
                    <span className='text-xs text-gray-500'>{Moment(comment.createdAt).fromNow()}</span>
                  </div>
                  <p className='text-sm text-gray-700 mt-1 break-words'>{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Add Comment Section */}
        <div className='max-w-3xl mx-auto mb-20'>
          <h2 className='text-2xl font-semibold mb-6 text-gray-700'>Add a Comment</h2>
          <form onSubmit={addComment} className='flex flex-col gap-4'>
            <input
              type="text"
              placeholder='Your Name'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50'
              required
            />
            <textarea
              placeholder='Your Comment'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className='w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50'
              required
            ></textarea>
            <button type='submit' className='bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition'>
              Submit Comment
            </button>
          </form>
        </div>
        {/* Share Buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share the article on social media</p>
          <div className='flex items-center gap-6'>
            <img src={assets.facebook_icon} alt="Facebook" width={50} />
            <img src={assets.twitter_icon} alt="Twitter" width={50} />
            <img src={assets.googleplus_icon} alt="Google Plus" width={50} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : <div>Loading...</div>
}

export default Blog
