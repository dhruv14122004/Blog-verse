import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ skill, level, color }) => (
    <div className="mb-4">
        <div className="flex justify-between mb-1 font-bold font-mono text-sm text-[var(--color-web-white)]">
            <span>{skill}</span>
            <span style={{ color: color }}>{level}%</span>
        </div>
        <div className="h-3 bg-zinc-800 border border-zinc-700 p-0.5">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full relative overflow-hidden"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            >
                <div className="absolute inset-0 bg-white/30 w-full h-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
        </div>
    </div>
);

const WebMasterProfile = () => {
    return (
        <div className="bg-black border-2 border-[var(--color-electric-blue)] p-8 max-w-2xl mx-auto shadow-[10px_10px_0px_var(--color-electric-blue)] relative overflow-hidden mt-12 mb-12 transform hover:scale-[1.01] transition-transform duration-300">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 items-center mb-10 z-10 relative">
                <div className="w-32 h-32 bg-zinc-800 rounded-full border-4 border-[var(--color-neon-red)] overflow-hidden relative group">
                    {/* Placeholder Avatar - Using CSS gradient if no image */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                        <span className="text-4xl">🕷️</span>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black italic text-white mb-2 tracking-tighter">DHRUV SHARMA</h2>
                    <p className="font-mono text-black bg-[var(--color-electric-blue)] inline-block px-3 py-1 font-bold transform -skew-x-12 shadow-[4px_4px_0px_white]">
                        WEB_WEAVER_LVLa.99
                    </p>
                </div>
            </div>

            {/* Skills */}
            <div className="z-10 relative bg-zinc-900/50 p-6 border border-zinc-800 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-[var(--color-neon-red)]">{">>>"}</span> ABILITY_SCORES
                </h3>
                <SkillBar skill="REACT / REDUX" level={95} color="var(--color-neon-red)" />
                <SkillBar skill="NODE.JS / BACKEND" level={90} color="var(--color-electric-blue)" />
                <SkillBar skill="UI / ANIMATION" level={85} color="var(--color-glitch-purple)" />
                <SkillBar skill="CREATIVITY" level={100} color="#ffcc00" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-[var(--color-electric-blue)] opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-[var(--color-electric-blue)] opacity-50"></div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(31,111,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(31,111,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
        </div>
    )
}

export default WebMasterProfile;
