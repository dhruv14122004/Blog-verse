import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import spiderBg from '../../assets/spider-man-loader.png';

const loadingTips = [
    "CALIBRATING WEB SHOOTERS...",
    "SYNCING MULTIVERSE NODES...",
    "AVOIDING CANON EVENTS...",
    "DOWNLOADING SPIDER-SOCIETY DATA...",
    "TUNING DIMENSIONAL WATCH..."
];

const GameLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);

    useEffect(() => {
        // Cycle tips
        const tipInterval = setInterval(() => {
            setTipIndex(prev => (prev + 1) % loadingTips.length);
        }, 800);

        // Progress bar simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Slight delay at 100%
                    return 100;
                }
                // Non-linear loading for "game" feel (fast start, slow middle, fast end)
                const increment = prev < 60 ? Math.random() * 3 : Math.random() * 1.5;
                return Math.min(100, prev + increment);
            });
        }, 30);

        return () => {
            clearInterval(interval);
            clearInterval(tipInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-end pb-20 overflow-hidden font-black uppercase italic"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
        >
            {/* Background Image with Parallax-like Zoom */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 z-0"
            >
                <img src={spiderBg} alt="Loading..." className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
                {/* Vignette & Scanlines */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,black_100%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10"></div>
            </motion.div>

            {/* Central Glitch Logo/Title */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-8xl md:text-9xl text-white tracking-tighter drop-shadow-[5px_5px_0_var(--color-neon-red)]"
                >
                    BLOGVERSE
                </motion.h1>
                <motion.div
                    className="text-[var(--color-neon-red)] text-2xl md:text-4xl tracking-[1em] mt-4 font-mono font-bold pl-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                >
                    Loading...
                </motion.div>
            </div>

            {/* Bottom Loading UI */}
            <div className="relative z-30 w-full max-w-4xl px-8 flex flex-col gap-2">
                {/* Loading Tip */}
                <motion.div
                    key={tipIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-white/80 font-mono text-sm tracking-widest pl-1"
                >
                    {">"} {loadingTips[tipIndex]}
                </motion.div>

                {/* Progress Bar Container */}
                <div className="h-4 w-full bg-zinc-900 border-2 border-zinc-700 skew-x-[-20deg] overflow-hidden relative shadow-[0_0_20px_rgba(255,45,45,0.3)]">
                    {/* Filling Bar */}
                    <motion.div
                        className="h-full bg-[var(--color-neon-red)] relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full -translate-x-full animate-[shimmer_1s_infinite]"></div>
                    </motion.div>
                </div>

                {/* Percentage & Decor */}
                <div className="flex justify-between items-center mt-1 text-[var(--color-neon-red)] font-mono text-xs font-bold">
                    <span>SYS_VER_2.4.0</span>
                    <span className="text-xl">{progress.toFixed(0)}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default GameLoader;
