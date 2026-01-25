import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate, Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar.jsx'
import SpiderNavbar from '../../components/navigation/SpiderNavbar';

const Layout = () => {
    const navigate = useNavigate();
    const logout = () => {
        navigate("/");
    };
    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-[var(--color-neon-red)] selection:text-white">
            <SpiderNavbar />
            <div className='flex pt-24'>
                <Sidebar />
                <main className='flex-1 p-4 sm:p-8 overflow-y-auto bg-black min-h-[calc(100vh-100px)]'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout
