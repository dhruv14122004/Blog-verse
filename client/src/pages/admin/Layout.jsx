import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate, Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar.jsx'
const Layout = () => {
    const navigate = useNavigate();
    const logout = () => {
        navigate("/");
    };
    return (
        <>
            <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
                <img onClick={() => { navigate("/") }} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
                <button onClick={logout} className='flex items-center gap-2 rounded-full text-sm bg-primary text-white px-6 py-2.5 hover:bg-primary/90 transition'>
                    Logout
                </button>
            </div>
            <div className='flex min-h-[calc(100vh-90px)]'>
                <Sidebar />
                <main className='flex-1 overflow-auto p-4 sm:p-6 bg-gray-50'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Layout
