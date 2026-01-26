import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIntroSeen } from '../features/ui/uiSlice';
import { blog_data } from '../assets/assets';
import SpiderLoader from '../components/effects/TunnelLoader';
import SpiderNavbar from '../components/navigation/SpiderNavbar';
import ComicCard from '../components/blog/ComicCard';
import Hero from '../components/common/Hero';
import { AnimatePresence } from 'framer-motion';
import milesBg from '../assets/miles-morales-3840x2160-18800.png';

import { useAppContext } from '../context/AppContext';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasSeenIntro = useSelector((state) => state.ui.hasSeenIntro);
    const { blog, input } = useAppContext();

    // If intro already seen, don't load. Else, start loading.
    const [loading, setLoading] = useState(!hasSeenIntro);
    const handleLoaderComplete = () => {
        setLoading(false);
        dispatch(setIntroSeen());
    };

    const filteredBlogs = input === ''
        ? blog
        : blog.filter((b) => b.title.toLowerCase().includes(input.toLowerCase()) || b.category.toLowerCase().includes(input.toLowerCase()));
    console.log(blog);
    return (
        <>
            <AnimatePresence>
                {loading && <SpiderLoader onComplete={handleLoaderComplete} />}
            </AnimatePresence>

            {!loading && (
                <div className="min-h-screen relative flex flex-col overflow-hidden bg-black selection:bg-[var(--color-neon-red)] selection:text-white">
                    {/* Background Image */}
                    <div className="fixed inset-0 z-0">
                        <img src={milesBg} alt="Background" className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
                        <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none"></div>
                    </div>

                    <SpiderNavbar />

                    <main className="relative z-10 flex-grow container mx-auto px-4 pb-20 pt-28">
                        <Hero />

                        {/* Comic Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-2 md:px-0">
                            {filteredBlogs.map((b, index) => (
                                <ComicCard key={b._id} blog={b} index={index} />
                            ))}
                        </div>
                    </main>

                    {/* Simple Comic Styled Footer */}
                    <footer className="relative z-20 border-t-4 border-black bg-[var(--color-neon-red)] py-6 text-center text-black font-black italic text-lg clip-comic">
                        <div className="absolute inset-0 bg-halftone opacity-20"></div>
                        <p className="relative z-10 text-shadow-comic text-white">
                            © 2026 BLOG VERSE // ACROSS THE SPIDER-NET
                        </p>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Home;
