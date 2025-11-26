import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
    const [sidebar, setSidebar] = useState(false)
    const navigate = useNavigate();
    const { user } = useUser()
    
    // --- Theme Classes ---
    const navBackground = 'bg-gray-900 border-gray-800';
    const iconColor = 'text-gray-400 hover:text-white';
    const contentBackground = 'bg-black'; // Main content area background

    return user ? (
        <div className='bg-black min-h-screen'>
            {/* Navigation Bar: Dark background, dark border */}
            <nav className={`w-full px-8 min-h-16 flex items-center justify-between border-b ${navBackground}`}>
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                    <img
                        src="/creavixtext.png"
                        alt="Creavix Logo"
                        className="w-28 sm:w-32 md:w-38 object-contain"
                        draggable="false"
                    />
                </div>
                {/* Menu Icons: Gray text, white hover */}
                {sidebar 
                    ? <X onClick={() => setSidebar(false)} className={`w-7 h-7 ${iconColor} sm:hidden transition-colors`} />
                    : <Menu onClick={() => setSidebar(true)} className={`w-7 h-7 ${iconColor} sm:hidden transition-colors`} />
                }
            </nav>
            {/* Main Content Area */}
            <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
                {/* Fix: use correct spelling for "sidebar" prop and Z-index for sidebar */}
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                {/* Main Content View: Black background */}
                <div className={`flex-1 ${contentBackground} overflow-y-auto`}>
                    <Outlet />
                </div>
            </div>
        </div>
    ):(
        // Sign-in fallback screen
        <div className="px-4 sm:px-10 md:px-16 lg:px-20 xl:px-32 relative inline-flex flex-col w-full items-center justify-center bg-[url('/src/assets/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen">
            <SignIn />
        </div>
    )
}

export default Layout;