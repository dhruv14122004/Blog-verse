import React from 'react';
import { useProgress } from '@react-three/drei';

const SpiderLoader = () => {
    const { progress } = useProgress();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center p-10 rounded-xl border border-[var(--color-neon-red)] bg-black shadow-[0_0_50px_rgba(255,45,45,0.2)]">
                <div className="text-[var(--color-neon-red)] text-6xl font-black mb-4 animate-pulse">
                    {progress.toFixed(0)}%
                </div>
                <div className="text-white font-mono tracking-widest text-sm">
                    LOADING UNIVERSE...
                </div>
                <div className="w-64 h-2 bg-zinc-800 mt-4 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--color-electric-blue)] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SpiderLoader;
