import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b-4 border-black flex justify-center items-center h-20 shadow-[0_4px_0_0_#000000] transition-all duration-200">
            <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer group">
                    <img
                        src="/creavixtext.png"
                        alt="Creavix Logo"
                        className="h-10 w-auto object-contain border-2 border-black p-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#000000]"
                        draggable="false"
                    />
                </div>

                {/* Button / User */}
                <div>
                    {user ? (
                        <UserButton
                            appearance={{
                                elements: {
                                    rootBox: "rounded-none border-2 border-black hover:bg-black transition p-1",
                                    avatarBox: "w-9 h-9",
                                },
                            }}
                        />
                    ) : (
                        <button
                            onClick={() => openSignIn()}
                            type="button"
                            className="group relative inline-flex items-center gap-2 px-8 py-3 text-sm font-mono font-black text-white bg-black rounded-none border-4 border-black overflow-hidden transition-all duration-200 hover:bg-blue-600 hover:border-blue-600 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 uppercase tracking-widest active:scale-95"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
