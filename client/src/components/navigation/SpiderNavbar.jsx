import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import spiderLogo from '../../assets/spider-man-across-3840x2160-10138.png';
import { useAppContext } from '../../context/AppContext';
import { FiExternalLink } from 'react-icons/fi';

const SpiderNavbar = () => {
    const { navigate, token, setToken } = useAppContext()
    const location = useLocation();
    // const isAdmin = location.includes('/admin'); // Removed unused variable

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
            <div className="text-2xl font-black italic tracking-tighter text-white flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <img src={spiderLogo} alt="" className="w-12 h-12" />
                BLOGVERSE
            </div>
            <div className="flex items-center gap-6 font-mono font-bold text-sm text-[var(--color-web-white)]">
                <Link to="/" className="hover:text-[var(--color-neon-red)] transition-colors cursor-pointer">HOME</Link>
                <button onClick={() => window.open('https://dihruv.me', '_blank')} className="hidden sm:flex items-center gap-2 bg-[var(--color-white)] text-black px-6 py-2 hover:bg-gray-200 transition-all skew-x-[-10deg] group cursor-pointer">
                    Made By
                    <FiExternalLink className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                    onClick={() => {
                        if (!token) {
                            navigate('/login');
                        } else {
                            if (location.pathname.includes('/admin')) {
                                setToken(null);
                                localStorage.removeItem('token');
                                navigate('/');
                            } else {
                                navigate('/admin');
                            }
                        }
                    }}
                    className="hidden sm:block bg-[var(--color-neon-red)] text-white px-6 py-2 hover:bg-red-600 transition-all skew-x-[-10deg] cursor-pointer"
                >
                    {!token ? 'LOGIN' : (location.pathname.includes('/admin') ? 'LOGOUT' : 'ADMIN')}
                </button>
            </div>
        </nav>
    );
};

export default SpiderNavbar;
