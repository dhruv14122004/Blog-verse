import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative text-center py-24 mb-12 perspective-1000 flex flex-col items-center">
            <motion.div
                initial={{ scale: 0.8, rotateX: 20 }}
                animate={{ scale: 1, rotateX: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative group mb-8"
            >
                {/* Main Heading Layer - Single Color Style */}
                <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white relative z-10 filter drop-shadow-[8px_8px_0px_var(--color-neon-red)]">
                    Welcome to the<br />
                    <span className="text-[var(--color-neon-red)]" style={{ textShadow: '4px 4px 0px white' }}>BLOGVERSE</span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, letterSpacing: '0px' }}
                animate={{ opacity: 1, letterSpacing: '2px' }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-8"
            >
                <span className="text-zinc-400 font-mono text-xs md:text-sm uppercase border border-zinc-700 inline-block px-4 py-2 bg-black/50 backdrop-blur-md">
                    A place for code, chaos, and creativity across dimensions.
                </span>
            </motion.div>

            {/* Search Bar - Comic Style */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 w-full max-w-4xl mx-auto relative group"
            >
                {/* Background Offset Shadow */}
                <div className="absolute inset-0 bg-[var(--color-neon-red)] transform translate-x-2 translate-y-2 rounded-full"></div>

                <div className="relative flex items-center bg-white border-2 border-black rounded-full overflow-hidden">
                    <div className="pl-6 text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="SEARCH ARTICLES"
                        className="w-full py-4 px-4 bg-transparent outline-none font-black italic text-black placeholder:text-zinc-400 uppercase tracking-wider"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
