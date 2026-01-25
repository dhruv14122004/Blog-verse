import React, { useState } from 'react';
import { Upload, FileText, Type, Layers, Image as ImageIcon } from 'lucide-react';

const Addblog = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Technology", // Default
    author: "Dhruv", // Hardcoded for now
    image: null
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setData(data => ({ ...data, image: e.target.files[0] }));
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Submitting Blog Data:", { ...data, image });
    // TODO: Integrate API call
    alert("BLOG TRANSMISSION INITIATED (Simulated)");
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
            <input onChange={onImageChange} type="file" id="image" hidden required />
          </label>
        </div>

        {/* Main Details */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 shadow-lg space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">ENTRY_TITLE</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                name="title"
                onChange={onChangeHandler}
                value={data.title}
                type="text"
                placeholder="ENTER_TITLE_HERE..."
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

            {/* Author - Could be dynamic */}
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
            <label className="block text-xs font-mono font-bold text-zinc-500 uppercase mb-2">CONTENT_BODY (HTML)</label>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={data.description}
              rows="10"
              placeholder="<p>Write your content here...</p>"
              required
              className="w-full p-4 bg-black border border-zinc-800 rounded text-zinc-300 font-mono text-sm focus:outline-none focus:border-[var(--color-neon-red)] transition-all resize-y placeholder:text-zinc-800"
            ></textarea>
            <p className="text-xs text-zinc-600 mt-2 text-right">HTML_TAGS_SUPPORTED</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-[var(--color-neon-red)] text-white px-8 py-4 font-black italic tracking-tighter text-xl uppercase skew-x-[-10deg] hover:bg-red-600 transition-all shadow-[4px_4px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            <span className="skew-x-[10deg] inline-block">TRANSMIT_DATA</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addblog;
