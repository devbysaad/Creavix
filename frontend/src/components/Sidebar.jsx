import { Protect, UserButton, useClerk, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Eraser, FileText, Hash, House, Image, Scissors, SquarePen, Users, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

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
        <div className={`fixed sm:relative inset-0 sm:inset-auto w-64 bg-white border-r-4 border-black flex flex-col text-sm font-mono font-bold shadow-[4px_0_0_0_#000000] ${sidebar ? 'translate-x-0 z-50' : 'max-sm:-translate-x-full z-40'} sm:z-40 transition-transform duration-200 h-screen sm:h-auto`}>

            {/* User Profile Section */}
            <div className='w-full pt-8 pb-6 px-4 border-b-4 border-black bg-white'>
                <div className='flex flex-col items-center'>
                    <div className="relative mb-4">
                        <img
                            src={user.imageUrl}
                            alt="User avatar"
                            className='w-24 h-24 rounded-none object-cover border-4 border-black'
                        />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-none border-2 border-black"></div>
                    </div>
                    <h1 className="text-lg font-mono font-black text-center text-black mb-3 uppercase tracking-wider">
                        {user.firstName || "User"}
                    </h1>
                    <div className='flex items-center justify-center'>
                        <Protect
                            plan='premium'
                            fallback={
                                <span className='inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-black bg-white text-black border-2 border-black uppercase tracking-widest'>
                                    Free
                                </span>
                            }
                        >
                            <span className='inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-black bg-blue-600 text-white border-2 border-black uppercase tracking-widest shadow-[2px_2px_0_0_#000000]'>
                                Premium
                            </span>
                        </Protect>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className='flex-1 overflow-y-auto scrollbar-hide px-3 py-6'>
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
                                    <span className="text-xs">{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Footer Section - Profile & Logout */}
            <div className="w-full p-4 border-t-4 border-black bg-white">
                <div className="flex items-center justify-between w-full gap-3">
                    <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    rootBox: "rounded-none border-2 border-black hover:border-blue-600 transition",
                                    avatarBox: "w-10 h-10 rounded-none",
                                },
                            }}
                        />
                        <div className="flex flex-col leading-tight min-w-0">
                            <span className="font-mono font-black text-black text-xs truncate uppercase tracking-wide">
                                {user.fullName}
                            </span>
                            <span className="text-xs font-mono font-bold text-black/60 truncate uppercase tracking-wider">
                                Settings
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={signOut}
                        className="p-2.5 rounded-none text-black hover:bg-black hover:text-white transition-all duration-200 border-2 border-black hover:shadow-[2px_2px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 flex-shrink-0"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {sidebar && (
                <div
                    className="fixed inset-0 bg-black/50 -z-10 sm:hidden"
                    onClick={() => setSidebar(false)}
                />
            )}
        </div>
    )
}

export default Sidebar