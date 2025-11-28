import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t-4 border-black mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

                    {/* Logo and description */}
                    <div className="col-span-1 lg:col-span-2 border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_#000000]">
                        <img src='/creavixtext.png' alt="Creavix AI Logo" className="h-10 w-auto mb-6 border-2 border-black p-2" />
                        <p className="text-black font-mono text-sm leading-relaxed max-w-md uppercase tracking-wide">
                            Experience the potential of AI with Creavix AI. Elevate your content creation using our advanced AI tools. Craft articles, produce stunning images, and streamline your workflow effortlessly.
                        </p>
                    </div>

                    {/* Company links */}
                    <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_#000000]">
                        <h3 className="text-sm font-mono font-black text-black tracking-widest uppercase mb-6 border-b-2 border-black pb-2">Company</h3>
                        <ul className="space-y-3">
                            <li><NavLink to="/" className="text-black hover:text-blue-600 transition-colors text-sm font-mono uppercase tracking-wider font-bold">Home</NavLink></li>
                            <li><NavLink to="/about" className="text-black hover:text-blue-600 transition-colors text-sm font-mono uppercase tracking-wider font-bold">About Us</NavLink></li>
                            <li><NavLink to="/contact" className="text-black hover:text-blue-600 transition-colors text-sm font-mono uppercase tracking-wider font-bold">Contact Us</NavLink></li>
                            <li><NavLink to="/privacy" className="text-black hover:text-blue-600 transition-colors text-sm font-mono uppercase tracking-wider font-bold">Privacy Policy</NavLink></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0_0_#000000]">
                        <h3 className="text-sm font-mono font-black text-black tracking-widest uppercase mb-4 border-b-2 border-black pb-2">Subscribe</h3>
                        <p className="text-black font-mono text-xs mb-6 uppercase tracking-wide">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                className="w-full appearance-none rounded-none border-4 border-black bg-white px-4 py-3 text-sm font-mono text-black placeholder-black/50 focus:border-blue-600 focus:outline-none uppercase tracking-wide"
                            />
                            <button
                                type="button"
                                className="w-full rounded-none border-4 border-black bg-black px-6 py-3 text-sm font-mono font-bold text-white shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 uppercase tracking-widest"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t-4 border-black pt-8">
                    <p className="text-base font-mono font-bold text-black text-center uppercase tracking-widest">
                        &copy; 2025 Creavix AI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
