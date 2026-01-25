import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]); // Stars
    const y2 = useTransform(scrollY, [0, 1000], [0, 100]); // City
    const y3 = useTransform(scrollY, [0, 1000], [0, -50]); // Webs

    return (
        <div className="fixed inset-0 min-h-screen w-full -z-10 bg-[var(--color-black-night)] overflow-hidden">
            {/* LAYER 1: Deep Space Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] to-[#1a0b1e]"></div>

            {/* LAYER 2: Drifting Stars - Simulated with radial gradients */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-50">
                <div className="absolute top-10 left-1/4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full shadow-[0_0_15px_blue]"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full"></div>
                {/* CSS Generated Starfield */}
                <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_10%_10%,white,transparent_20%),radial-gradient(1px_1px_at_50%_50%,white,transparent_20%),radial-gradient(2px_2px_at_90%_80%,#aaa,transparent_20%)] bg-[length:400px_400px]"></div>
            </motion.div>

            {/* LAYER 3: Wireframe City Silhouettes */}
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 pointer-events-none">
                {/* Using CSS grid/gradients to simulate skyscrapers */}
                <div className="absolute bottom-0 w-full h-full flex items-end justify-center gap-2">
                    <div className="w-20 h-64 border-t-2 border-l-2 border-r-2 border-[var(--color-glitch-purple)] bg-[linear-gradient(0deg,transparent_90%,var(--color-glitch-purple)_100%)] bg-[length:10px_20px]"></div>
                    <div className="w-16 h-48 border-t-2 border-l-2 border-r-2 border-[var(--color-glitch-purple)]"></div>
                    <div className="w-24 h-80 border-t-2 border-l-2 border-r-2 border-[var(--color-electric-blue)] bg-[linear-gradient(45deg,transparent_40%,rgba(31,111,255,0.2)_100%)]"></div>
                    <div className="w-12 h-32 border-t-2 border-l-2 border-r-2 border-[var(--color-neon-red)]"></div>
                    {/* Repeat pattern across specific breakpoints if needed, simple centered cluster for now */}
                </div>
            </motion.div>

            {/* LAYER 4: Faint Spider Webs */}
            <motion.div style={{ y: y3 }} className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none stroke-[0.2]">
                    <path d="M50 50 L100 0 M50 50 L100 20 M50 50 L100 50 M50 50 L100 80 M50 50 L100 100" />
                    <circle cx="50" cy="50" r="10" />
                    <circle cx="50" cy="50" r="20" />
                    <circle cx="50" cy="50" r="30" />
                </svg>
            </motion.div>

            {/* LAYER 5: subtle rain */}
            <div className="absolute inset-0 bg-rain opacity-30 pointer-events-none mix-blend-screen"></div>

        </div>
    );
};

export default ParallaxBackground;
