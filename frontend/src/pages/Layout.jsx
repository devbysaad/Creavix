import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
    const [sidebar, setSidebar] = useState(false)
    const navigate = useNavigate();
    const { user } = useUser()

    return user ? (
        <div className='bg-white min-h-screen flex flex-col'>
            {/* Navigation Bar */}
            <nav className="w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between border-b-4 border-black bg-white sticky top-0 z-50 shadow-[0_4px_0_0_#000000]">
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer group">
                    <img
                        src="/creavixtext.png"
                        alt="Creavix Logo"
                        className="h-10 w-auto object-contain border-2 border-black p-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#000000]"
                        draggable="false"
                    />
                </div>
                {/* Menu Icons */}
                {sidebar
                    ? <X onClick={() => setSidebar(false)} className="w-8 h-8 text-black hover:text-blue-600 sm:hidden transition-colors cursor-pointer" />
                    : <Menu onClick={() => setSidebar(true)} className="w-8 h-8 text-black hover:text-blue-600 sm:hidden transition-colors cursor-pointer" />
                }
            </nav>
            {/* Main Content Area */}
            <div className='flex-1 w-full flex overflow-hidden'>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                {/* Main Content View */}
                <div className="flex-1 bg-white overflow-y-auto relative scroll-smooth">
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        // Sign-in fallback screen
        <div className="relative flex flex-col w-full items-center justify-center min-h-screen bg-white overflow-hidden border-8 border-black">
            <div className="absolute inset-0 bg-white pointer-events-none"></div>
            <div className="relative z-10 border-4 border-black p-8 bg-white shadow-[12px_12px_0_0_#000000]">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "shadow-none",
                            card: "bg-white border-4 border-black rounded-none font-mono",
                            headerTitle: "text-black font-mono font-black uppercase tracking-wider",
                            headerSubtitle: "text-black font-mono uppercase tracking-wide",
                            socialButtonsBlockButton: "bg-white border-4 border-black text-black hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-none font-mono font-bold uppercase tracking-widest shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all",
                            formFieldLabel: "text-black font-mono font-bold uppercase tracking-wide",
                            formFieldInput: "bg-white border-4 border-black text-black rounded-none font-mono focus:border-blue-600",
                            footerActionLink: "text-blue-600 hover:text-black font-mono font-bold uppercase tracking-wide"
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Layout;