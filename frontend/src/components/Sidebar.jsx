import { Protect, UserButton, useClerk, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { LogOut, } from "lucide-react";

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser()
    const { signOut } = useClerk()
    
    // --- Theme Classes ---
    const sidebarBg = 'bg-gray-900 border-gray-800'; 
    const iconColor = 'text-gray-400';
    // UPDATED: Active link style uses a Blue/Cyan gradient
    const activeLinkClasses = 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-inner shadow-blue-900/50';
    const inactiveLinkClasses = 'text-gray-400 hover:bg-gray-800 transition-colors duration-200';

    return (
        <div className={`w-60 ${sidebarBg} border-r flex flex-col justify-between text-sm font-normal items-center max-sm:absolute top-16 bottom-0 z-20 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            
            <div className='w-full pt-6 flex flex-col'>
                
                <div className='flex flex-col items-center mb-6'>
                    <img 
                        src={user.imageUrl} 
                        alt="User avatar" 
                        className='w-16 h-16 rounded-full object-cover mx-auto border-2 border-indigo-500' 
                    />
                    <h1 className="text-lg font-semibold text-center text-white mt-2">{user.firstName || "User"}</h1>
                    <p className='text-xs text-gray-500'>
                        {user?.publicMetadata?.plan?.trim().toLowerCase() === "premium"
                            ? <span className='text-indigo-400 font-medium'>Premium Plan</span>
                            : "Free Plan"
                        }
                    </p>
                </div>

                <hr className="my-3 border-gray-800 w-4/5 mx-auto" />

                <div className='pt-0 w-full px-3'>
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg my-1
                                ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : iconColor}`} />
                                    {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

            </div>
            
            <div className={`w-full p-3 border-t ${sidebarBg}`}> 
                <div className="flex items-center justify-between w-full">

                    <div className="flex items-center gap-3">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    rootBox: "rounded-full border border-gray-700 hover:bg-gray-800 transition p-0.5",
                                    avatarBox: "w-8 h-8", 
                                },
                            }}
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="font-semibold text-white text-sm">
                                {user.fullName}
                            </span>
                            <p className="text-xs text-gray-500">
                                View Profile
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={signOut}
                        className={`p-2 rounded-lg ${inactiveLinkClasses}`} 
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5 text-gray-400" />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;