import React from 'react';
import SpiderScene from '../components/universe/SpiderScene';
import SpiderNavbar from '../components/navigation/SpiderNavbar';
import WebMasterProfile from '../components/common/WebMasterProfile';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white relative overflow-hidden">
            <SpiderScene />
            <SpiderNavbar />

            <div className="relative z-10 container mx-auto px-4 py-20">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-red)] to-[var(--color-glitch-purple)] drop-shadow-[4px_4px_0px_white]">
                        ABOUT ME
                    </h1>
                </motion.div>

                <WebMasterProfile />

                <div className="max-w-3xl mx-auto text-center mt-20 bg-black/80 p-8 border border-zinc-800 backdrop-blur-md">
                    <p className="text-lg leading-loose text-zinc-300 font-mono">
                        Welcome to the <span className="text-[var(--color-neon-red)] font-bold">Blog Verse</span>.
                        This is a space where technology meets creativity. I build 3D web experiences,
                        explore new frameworks, and write about my journey through the multiverse of code.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
