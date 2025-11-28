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

    return (
        <div className={`w-64 bg-white border-r-4 border-black flex flex-col justify-between text-sm font-mono font-bold items-center max-sm:absolute top-20 bottom-0 z-40 shadow-[4px_0_0_0_#000000] ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-transform duration-200`}>

            <div className='w-full pt-6 flex flex-col px-3'>

                <div className='flex flex-col items-center mb-8 px-4 pb-6 border-b-4 border-black'>
                    <div className="relative">
                        <img
                            src={user.imageUrl}
                            alt="User avatar"
                            className='w-20 h-20 rounded-none object-cover mx-auto border-4 border-black'
                        />
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-600 rounded-none border-2 border-black"></div>
                    </div>
                    <h1 className="text-base font-mono font-black text-center text-black mt-4 uppercase tracking-wider">{user.firstName || "User"}</h1>
                    <p className='text-xs font-mono font-bold text-black mt-2 uppercase tracking-wide'>
                        {user?.publicMetadata?.plan?.trim().toLowerCase() === "premium"
                            ? <span className='inline-flex items-center px-3 py-1 rounded-none text-xs font-mono font-black bg-blue-600 text-white border-2 border-black uppercase tracking-widest'>Premium</span>
                            : <span className="text-black border-2 border-black px-3 py-1 rounded-none bg-white">Free</span>
                        }
                    </p>
                </div>

                <div className='w-full space-y-2'>
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `px-4 py-3 flex items-center gap-3 rounded-none transition-all duration-200 group uppercase tracking-wider border-2 font-black
                                ${isActive
                                    ? 'bg-black text-white border-black shadow-[4px_4px_0_0_#000000] -translate-x-1 -translate-y-1'
                                    : 'text-black border-black bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-[4px_4px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-black group-hover:text-white'}`} />
                                    {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

            </div>

            <div className="w-full p-4 border-t-4 border-black bg-white">
                <div className="flex items-center justify-between w-full">

                    <div className="flex items-center gap-3 overflow-hidden">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    rootBox: "rounded-none border-2 border-black hover:border-blue-600 transition",
                                    avatarBox: "w-8 h-8",
                                },
                            }}
                        />
                        <div className="flex flex-col leading-tight min-w-0">
                            <span className="font-mono font-black text-black text-xs truncate uppercase tracking-wide">
                                {user.fullName}
                            </span>
                            <span className="text-xs font-mono font-bold text-black/60 truncate uppercase tracking-wider">
                                Profile
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={signOut}
                        className="p-2 rounded-none text-black hover:bg-black hover:text-white transition-colors border-2 border-black"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;