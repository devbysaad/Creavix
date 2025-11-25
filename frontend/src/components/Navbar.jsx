import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <nav className="fixed z-50 backdrop-blur-2xl flex justify-center items-center w-full py-4">
            <div className="flex items-center justify-between w-full max-w-7xl px-4 sm:px-10">
                
                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                    <img
                        src="/creavixtext.png"
                        alt="Creavix Logo"
                        className="w-28 sm:w-32 md:w-38 object-contain"
                        draggable="false"
                    />
                </div>

                {/* Button / User */}
                <div>
                    {user ? (
                        <UserButton
                            appearance={{
                                elements: {
                                    rootBox: "rounded-full border border-gray-300 hover:bg-gray-100 transition p-1",
                                    avatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    ) : (
                        <button
                            onClick={() => openSignIn()}
                            type="button"
                            className="py-2 sm:py-2.5 text-sm sm:text-base cursor-pointer active:scale-95 transition-all hover:scale-102 flex items-center gap-2 bg-primary px-6 sm:px-10 rounded-full text-white hover:bg-blue-700"
                        >
                            Get Started <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
