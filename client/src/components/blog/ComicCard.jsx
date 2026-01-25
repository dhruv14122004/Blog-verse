import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ComicCard = ({ blog, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Staggered delay for list animation
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: index * 0.1, duration: 0.5, type: 'spring' }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group perspective-1000 mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Floating Effect Container */}
            <motion.div
                animate={{
                    y: isHovered ? -10 : 0,
                    rotateX: isHovered ? 5 : 0,
                    rotateY: isHovered ? 5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-white clip-comic border-[3px] border-black h-full flex flex-col overflow-hidden transform transition-shadow duration-300"
                style={{
                    boxShadow: isHovered
                        ? '15px 15px 0px rgba(0,0,0,0.8), 0 0 20px var(--color-neon-red)'
                        : '8px 8px 0px rgba(0,0,0,1)'
                }}
            >
                <Link to={`/blog/${blog._id}`}>
                {/* Inner Glow Border */}
                <div className="absolute inset-0 border-2 border-[var(--color-electric-blue)] opacity-0 group-hover:opacity-100 pointer-events-none z-20 m-1 clip-comic mix-blend-screen"></div>

                {/* Image Panel */}
                <div className="relative h-56 overflow-hidden border-b-[3px] border-black bg-zinc-900">
                    {/* Diagonal Scratch Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/scratch-ink.png')] opacity-20 pointer-events-none z-10 mix-blend-overlay"></div>

                    {/* Corner Tape/Staple Effect - pure CSS */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-l-[3px] border-t-[3px] border-white z-20 opacity-80"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-r-[3px] border-b-[3px] border-white z-20 opacity-80"></div>

                    <motion.img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover filter contrast-125 grayscale-[20%] group-hover:grayscale-0"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Category Badge - Sticker Style */}
                    <div className="absolute bottom-6 right-4 z-30 transform rotate-[-3deg] group-hover:rotate-[3deg] transition-transform">
                        <div className="bg-[var(--color-neon-red)] text-white font-black text-xs px-4 py-1 border-[2px] border-black shadow-[3px_3px_0px_black] clip-badge uppercase tracking-widest">
                            {blog.category}
                        </div>
                    </div>
                </div>

                {/* Content Panel */}
                <div className="p-6 pt-8 flex-grow flex flex-col bg-white relative">
                    {/* Halftone Texture on Content BG */}
                    <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

                    <h3 className="text-2xl font-black text-black leading-none mb-2 text-shadow-comic group-hover:animate-vibrate z-10">
                        {blog.title.toUpperCase()}
                    </h3>

                    <p className="font-mono text-zinc-500 text-xs mb-4 uppercase tracking-tighter">
                        {blog.subTitle || "TRANSMISSION_RECEIVED..."}
                    </p>

                    {/* Meta Info & CTA */}
                    <div className="mt-auto pt-4 border-t-2 border-dashed border-black flex justify-between items-center z-10">
                        <div className="flex flex-col font-mono text-[10px] text-zinc-600">
                            <span>ID: #{blog._id.slice(-4).toUpperCase()}</span>
                            <span>DATE: {new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>

                        
                            <button className="relative bg-black text-white px-5 py-2 rounded-full font-bold text-xs uppercase border border-[var(--color-electric-blue)] group/btn overflow-hidden">
                                <span className="relative z-10 group-hover/btn:text-[var(--color-neon-red)] transition-colors">
                                    [ READ ISSUE &rarr; ]
                                </span>
                                {/* Hover Fill */}
                                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left ease-out"></div>
                            </button>
                        
                    </div>
                </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default ComicCard;
