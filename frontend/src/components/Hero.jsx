import React from 'react'
import userGroup from "../assets/user_group.png";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col w-full justify-center min-h-[90vh] bg-white overflow-hidden pt-20 border-b-4 border-black">

            {/* Background Effects - Removed gradients, kept stark white */}
            <div className="absolute inset-0 bg-white pointer-events-none"></div>

            {/* Content */}
            <div className='flex flex-col justify-center text-center mt-20 sm:mt-32 relative z-10 px-4'>
                <div className="inline-flex items-center justify-center px-6 py-2 mb-8 mx-auto rounded-none border-4 border-blue-600 bg-white text-blue-600 text-sm font-mono font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000000]">
                    <span className="flex h-3 w-3 rounded-none bg-blue-600 mr-3 border border-black"></span>
                    New Features Available
                </div>

                <h1 className='text-5xl sm:text-6xl md:text-7xl font-mono font-black text-black tracking-tight leading-tight uppercase'>
                    Craft stunning content with <br className="hidden sm:block" />
                    <span className='text-blue-600 border-b-8 border-blue-600'>Intelligent AI Tools</span>
                </h1>

                <p className='py-8 max-w-2xl mx-auto text-lg sm:text-xl font-mono text-black leading-relaxed uppercase tracking-wide'>
                    Upgrade the way you create. Write articles, produce images, and optimize your workflow with our advanced AI-powered platform.
                </p>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 relative z-10 px-4'>
                <button onClick={() => navigate('/ai')}
                    className='w-full sm:w-auto py-4 px-10 rounded-none bg-black text-white font-mono font-black uppercase tracking-widest border-4 border-black hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 shadow-[6px_6px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 active:scale-95'>
                    Start Creating Now
                </button>
                <button
                    className='w-full sm:w-auto py-4 px-10 rounded-none bg-white text-black font-mono font-black uppercase tracking-widest border-4 border-black hover:bg-black hover:text-white transition-all duration-200 shadow-[6px_6px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 active:scale-95'>
                    Watch Demo
                </button>
            </div>

            {/* User testimonial */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-6 py-12 mt-8 relative z-10'>
                <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-none border-4 border-black bg-white flex items-center justify-center text-xs text-black overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" className="w-full h-full" />
                        </div>
                    ))}
                    <div className="w-12 h-12 rounded-none border-4 border-black bg-black flex items-center justify-center text-xs text-white font-mono font-black">
                        +2k
                    </div>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} className="w-5 h-5 text-blue-600 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className='text-sm font-mono font-bold text-black mt-2 uppercase tracking-wider'>
                        Trusted by <span className="text-blue-600 font-black">100K+ creators</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero;
