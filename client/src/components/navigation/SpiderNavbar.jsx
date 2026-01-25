import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import spiderLogo from '../../assets/spider-man-across-3840x2160-10138.png';

const SpiderNavbar = () => {
    const navigate = useNavigate();
    const location = window.location.pathname; // Simple check for current path
    const isAdmin = location.includes('/admin');

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
            <div className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <img src={spiderLogo} alt="" className="w-12 h-12" />
                BLOGVERSE
            </div>
            <div className="flex items-center gap-6 font-mono font-bold text-sm text-[var(--color-web-white)]">
                <Link to="/" className="hover:text-[var(--color-neon-red)] transition-colors">HOME</Link>
                <Link to="/about" className="hover:text-[var(--color-electric-blue)] transition-colors">ABOUT</Link>
                <button
                    onClick={() => {
                        if (isAdmin) {
                            navigate('/'); // Logout logic: redirect to home
                        } else {
                            navigate('/login'); // Go to login first
                        }
                    }}
                    className="hidden sm:block bg-[var(--color-neon-red)] text-white px-6 py-2 hover:bg-red-600 transition-all skew-x-[-10deg]"
                >
                    {isAdmin ? 'LOGOUT' : 'ADMIN_PANEL'}
                </button>
            </div>
        </nav>
    );
};

export default SpiderNavbar;
