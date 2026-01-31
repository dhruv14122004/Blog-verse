import React, { useState } from 'react';
import { Upload, FileText, Type, Layers, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { marked } from 'marked';

const Addblog = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('write');
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "Technology", // Default
    author: "Dhruv", // Hardcoded for now
    image: null
  });

  const { axios } = useAppContext();
  const textareaRef = React.useRef(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  };

  React.useEffect(() => {
    if (activeTab === 'write') {
      adjustTextareaHeight();
    }
  }, [data.description, activeTab]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const generateContent = async (provider) => {
    if (!data.description.trim()) {
      toast.error("Please enter a prompt in the content body first");
      return;
    }
    setLoading(true);
    try {
      const endpoint = provider === 'gemini'
        ? '/api/blog/generate-content/gemini'
        : '/api/blog/generate-content/mistral';

      const { data: res } = await axios.post(endpoint, { prompt: data.description });
      if (res.success) {
        setData(prev => ({ ...prev, description: res.content }));
        toast.success(`Generated with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please upload a cover image");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    // Convert Markdown to HTML before sending
    formData.append("description", marked.parse(data.description));
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);

    try {
      const { data: responseData } = await axios.post('/api/blog/create', formData);
      if (responseData.success) {
        toast.success(responseData.message);
        setImage(null);
        setData({
          title: "",
          subtitle: "",
          description: "",
          category: "Technology",
          author: "Dhruv",
          image: null
        });
        setActiveTab('write');
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  return (
    <div className="font-sans text-white max-w-4xl mx-auto">
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-black italic tracking-tighter text-white flex items-center gap-2">
          <FileText className="text-[var(--color-neon-red)]" size={32} />
          ADD_BLOG
        </h1>
      </div>

      <form onSubmit={onSubmitHandler} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-lg">
          <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-4">COVER_IMAGE_UPLOAD</label>
          <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-700 rounded-lg hover:bg-zinc-800 hover:border-[var(--color-electric-blue)] transition-all group overflow-hidden relative">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            ) : (
              <div className="flex flex-col items-center text-zinc-500 group-hover:text-white transition-colors">
                <Upload size={48} className="mb-2" />
                <p className="font-mono text-sm">CLICK_TO_UPLOAD_ASSET</p>
                <p className="text-xs text-zinc-600 mt-2">PNG, JPG, WEBP (MAX 5MB)</p>
              </div>
            )}
            <input onChange={onImageChange} type="file" id="image" hidden />
          </label>
        </div>

        {/* Main Details */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-lg space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">TITLE</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                name="title"
                onChange={onChangeHandler}
                value={data.title}
                type="text"
                placeholder="Start typing..."
                required
                className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-[var(--color-neon-red)] focus:ring-1 focus:ring-[var(--color-neon-red)] transition-all font-bold text-lg placeholder:text-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">SUB-TITLE</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                name="subtitle"
                onChange={onChangeHandler}
                value={data.subtitle}
                type="text"
                placeholder="Start typing..."
                required
                className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-[var(--color-neon-red)] focus:ring-1 focus:ring-[var(--color-neon-red)] transition-all font-bold text-lg placeholder:text-zinc-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">CATEGORY</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Layers className="h-5 w-5 text-zinc-500" />
                </div>
                <select
                  name="category"
                  onChange={onChangeHandler}
                  value={data.category}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-zinc-800 rounded text-white focus:outline-none focus:border-[var(--color-electric-blue)] appearance-none cursor-pointer hover:bg-zinc-900 transition-colors"
                >
                  <option value="Technology">Technology</option>
                  <option value="Startup">Startup</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Finance">Finance</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">AUTHOR_ID</label>
              <input
                type="text"
                value="Dhruv (Admin)"
                disabled
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-zinc-500 cursor-not-allowed italic"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-xs font-mono font-bold text-zinc-500 uppercase">CONTENT_BODY (MARKDOWN)</label>

              <div className="flex items-center gap-4">
                <div className="flex border border-zinc-700 rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`px-4 py-1 text-xs font-bold uppercase transition-colors ${activeTab === 'write' ? 'bg-zinc-700 text-white' : 'bg-transparent text-zinc-500 hover:text-white'}`}
                  >
                    WRITE
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-4 py-1 text-xs font-bold uppercase transition-colors ${activeTab === 'preview' ? 'bg-zinc-700 text-white' : 'bg-transparent text-zinc-500 hover:text-white'}`}
                  >
                    PREVIEW
                  </button>
                </div>

                {activeTab === 'write' && (
                  <div className='flex gap-2'>
                    <button
                      type="button"
                      onClick={() => generateContent('gemini')}
                      disabled={loading}
                      className={`p-1.5 font-bold uppercase rounded transition-all flex items-center justify-center min-w-[80px] text-[10px]
                                ${loading ? 'bg-zinc-800 cursor-not-allowed opacity-50' : 'bg-[var(--color-neon-red)] hover:bg-red-700 text-white shadow-[2px_2px_0px_white]'}`}
                    >
                      {loading ? '...' : 'GEMINI_AI'}
                    </button>
                    <button
                      type="button"
                      onClick={() => generateContent('mistral')}
                      disabled={loading}
                      className={`p-1.5 font-bold uppercase rounded transition-all flex items-center justify-center min-w-[80px] text-[10px]
                                ${loading ? 'bg-zinc-800 cursor-not-allowed opacity-50' : 'bg-white text-black hover:bg-zinc-200 border-2 border-[var(--color-neon-red)]'}`}
                    >
                      {loading ? '...' : 'MISTRAL_AI'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {activeTab === 'write' ? (
              <textarea
                ref={textareaRef}
                name="description"
                onChange={onChangeHandler}
                value={data.description}
                rows="10"
                placeholder="Write in Markdown..."
                required
                disabled={loading}
                className={`w-full p-4 bg-black border border-zinc-800 rounded text-zinc-300 font-mono text-sm focus:outline-none focus:border-[var(--color-neon-red)] transition-all resize-y placeholder:text-zinc-800 min-h-[300px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              ></textarea>
            ) : (
              <div
                className="w-full p-6 bg-zinc-900 border border-zinc-800 rounded prose prose-invert prose-sm max-w-none min-h-[300px]"
                dangerouslySetInnerHTML={{ __html: marked.parse(data.description || '*No content to preview*') }}
              />
            )}
            <p className="text-xs text-zinc-600 mt-2 text-right">MARKDOWN_SUPPORTED</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-[var(--color-neon-red)] text-white px-8 py-4 font-black italic tracking-tighter text-xl uppercase skew-x-[-10deg] hover:bg-red-600 transition-all shadow-[4px_4px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            <span className="skew-x-[10deg] inline-block">Publish</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addblog;
