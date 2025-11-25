import { Protect, UserButton, useClerk, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { LogOut,  } from "lucide-react";

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
    const { signOut, openUserProfile } = useClerk()
    return (
        <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            <div className='mt-10'>
                <img src={user.imageUrl} alt="User avatar" className='w-20 h-20 rounded-full object-cover mx-auto mb-4' />
                <h1 className="text-lg font-semibold text-center text-gray-900 mb-2">{user.fullName}</h1>
                <hr className="my-6 border-gray-200 w-4/5 mx-auto" />

                <div className='pt-2'>
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `px-3.5 py-2.5 flex items-center gap-3 rounded 
                                  ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                    {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

            </div>
            <div>

                <div className="flex flex-col mb-6 w-full px-3">

                    {/* ROW: Avatar + Name/Plan + Signout */}
                    <div className="flex items-center justify-between w-full">

                        {/* Left Side: Avatar + Text */}
                        <div className="flex items-center gap-3">

                            {/* (1) Profile Picture */}

                            <UserButton
                                appearance={{
                                    elements: {
                                        rootBox: "rounded-full border border-gray-300 hover:bg-gray-100 transition p-1",
                                        avatarBox: "w-10 h-10",
                                    },
                                }}
                            />
                            {/* Column: name (2) and plan (3) */}
                            <div className="flex flex-col leading-tight">
                                <span className="font-semibold text-gray-900 text-sm">
                                    {user.fullName} {/* 2 */}
                                </span>
                                <p className="text-xs text-gray-500">
                                    {user?.publicMetadata?.plan?.trim().toLowerCase() === "premium"
                                        ? "Premium Plan"
                                        : "Free Plan"
                                    }
                                </p>

                            </div>
                        </div>

                        {/* (4) Signout Button */}
                        <button
                            onClick={signOut}
                            className="flex items-center gap-2 px-3 py-1.5 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar
