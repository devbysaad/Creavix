import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
    const [sidebar, setSidebar] = useState(false)
    const navigate = useNavigate();
    const {user} = useUser()
    return user ? (
        <div>
            <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                    <img
                        src="/creavixtext.png"
                        alt="Creavix Logo"
                        className="w-28 sm:w-32 md:w-38 object-contain"
                        draggable="false"
                    />
                </div>
                {sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' />
                    : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
                }
            </nav>
            <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
                <Sidebar sibebar={sidebar} setSidebar={setSidebar}/>
                <div className='flex-1 bg-[#F4F7FB]'>
            <Outlet />
                </div>
            </div>
        </div>
    ):(
        <div className="px-4 sm:px-10 md:px-16 lg:px-20 xl:px-32 relative inline-flex flex-col w-full items-center justify-center bg-[url('/src/assets/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen">
            <SignIn />
        </div>
    )
}

export default Layout