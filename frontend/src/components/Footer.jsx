import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-300">
                <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">

                    {/* Logo and description */}
                    <div className="flex flex-col max-w-sm">
                        <img src='/creavixtext.png' alt="Creavix AI Logo" className="w-36 mb-4" />
                        <p className="text-gray-400 text-sm">
                            Experience the potential of AI with Creavix AI. Elevate your content creation using our advanced AI tools. Craft articles, produce stunning images, and streamline your workflow effortlessly.
                        </p>
                    </div>

                    {/* Company links */}
                    <div className="flex flex-col">
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
                            <li><NavLink to="/about" className="hover:text-white">About Us</NavLink></li>
                            <li><NavLink to="/contact" className="hover:text-white">Contact Us</NavLink></li>
                            <li><NavLink to="/privacy" className="hover:text-white">Privacy Policy</NavLink></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col max-w-sm">
                        <h3 className="text-white font-semibold mb-4">Subscribe to our newsletter</h3>
                        <p className="text-gray-400 text-sm mb-3">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 border border-gray-700 rounded-lg px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                            <button className="bg-indigo-600 cursor-pointer active:scale-95 transition-all hover:scale-102 text-white px-4 py-2 rounded-lg hover:bg-indigo-500">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
                    Copyright 2025 © Creavix AI. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
