import React from 'react';
import { motion } from 'framer-motion';

const ComicCover = ({ title, image }) => {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full aspect-video border-4 border-black overflow-hidden shadow-[8px_8px_0px_var(--color-neon-red)] mb-8 bg-zinc-900"
        >
            <img src={image} alt={title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute top-4 left-0 bg-[var(--color-neon-red)] text-white font-black px-6 py-2 text-xl border-r-4 border-b-4 border-black transform -skew-x-12 origin-top-left shadow-lg">
                BLOG VERSE ISSUE #1
            </div>

            <div className="absolute bottom-8 left-0 max-w-[90%]">
                <h1 className="bg-[var(--color-web-white)] text-black p-4 text-4xl md:text-6xl font-black uppercase leading-none border-r-4 border-t-4 border-b-4 border-black inline-block transform skew-x-[-2deg] shadow-lg">
                    {title}
                </h1>
            </div>

            {/* Halftone Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[length:4px_4px] pointer-events-none opacity-50"></div>
        </motion.div>
    );
};

export default ComicCover;
