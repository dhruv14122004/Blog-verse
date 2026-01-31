import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const Hero = () => {
    const { input, setInput, blog } = useAppContext();
    return (
        <div className="w-full mb-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b-2 border-zinc-900 pb-6">
                {/* Heading */}
                <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-none"
                >
                    BLOGS
                    <span className="text-[var(--color-neon-red)]">.</span>
                </motion.h1>

                {/* Search Bar - Comic Style */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full md:w-96 group"
                >
                    {/* Background Offset Shadow */}
                    <div className="absolute inset-0 bg-[var(--color-neon-red)] transform translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>

                    <div className="relative flex items-center bg-white border-2 border-black rounded-full overflow-hidden h-12">
                        <div className="pl-4 text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="SEARCH ARTICLES..."
                            className="w-full py-2 px-3 bg-transparent outline-none font-bold italic text-black placeholder:text-zinc-400 uppercase tracking-wider text-sm"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Category Filter - Horizontal Scroll */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full overflow-x-auto pb-4 hide-scrollbar"
            >
                <div className="flex flex-wrap gap-4">
                    {["All", ...new Set(blog.map(b => b.category))].map((cat, index) => (
                        <button
                            key={index}
                            onClick={() => setInput(cat === "All" ? "" : cat)}
                            className={`
                                relative px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border transition-all duration-300
                                ${cat === "All" && input === "" || (cat !== "All" && input.toLowerCase() === cat.toLowerCase())
                                    ? "bg-[var(--color-neon-red)] text-white border-[var(--color-neon-red)]"
                                    : "bg-black/40 text-zinc-400 border-zinc-700 hover:border-white hover:text-white"
                                }
                            `}
                        >
                            <span className="relative z-10">{cat}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
