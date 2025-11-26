import React from 'react'
import userGroup from "../assets/user_group.png";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col w-full justify-center min-h-screen bg-black overflow-hidden">
            
            {/* Shiny overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 opacity-40 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-gray-900 opacity-20 pointer-events-none"></div>

            {/* Content */}
            <div className='flex flex-col justify-center text-center mt-32 sm:mt-40 md:mt-48 lg:mt-52 relative z-10'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold text-white drop-shadow-lg'>
                    Craft stunning content using <br />
                    powerful <span className='text-indigo-400'>AI tools</span>
                </h1>
                <p className='py-6 sm:py-8 md:py-10 text-base sm:text-lg md:text-xl text-gray-300'>
                    Upgrade the way you create. Write articles, produce images, and optimize your
                    <br />
                    workflow with our AI-powered tools.
                </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row justify-center items-center text-center gap-4 sm:gap-5 mt-6 relative z-10'>
                <button onClick={()=> navigate('/ai')} 
                    className='py-3 sm:py-4 px-8 sm:px-10 rounded-lg cursor-pointer active:scale-95 transition-all hover:scale-105 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md'>
                    start creating now
                </button>
                <button 
                    className='py-3 sm:py-4 px-8 sm:px-10 rounded-lg cursor-pointer active:scale-95 transition-all hover:scale-105 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium border border-gray-700 shadow-sm'>
                    watch demo
                </button>
            </div>

            {/* User testimonial */}
            <div className='flex flex-col sm:flex-row justify-center items-center text-center gap-3 sm:gap-5 py-5 sm:py-7 mt-6 text-gray-400 relative z-10'>
                <img className='w-24 sm:w-30 opacity-90' src={userGroup} alt="userGroup" />
                <h2 className='text-base sm:text-lg md:text-xl text-gray-300'>
                    Trusted by 100K+ people
                </h2>
            </div>
        </div>
    )
}

export default Hero;
