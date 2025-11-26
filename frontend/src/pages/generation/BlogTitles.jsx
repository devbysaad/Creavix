import React, { useState } from 'react';
import { Hash, Sparkles } from 'lucide-react';

const BlogTitles = () => {
    const [topic, setTopic] = useState('');
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- Theme Classes ---
    const mainBackground = 'h-[100%] m-5 overflow-y-scroll p-6 bg-black';
    const panelClasses = 'bg-gray-900 border border-gray-800 rounded-xl p-6 h-full shadow-lg';
    const inputClasses = 'w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500';
    // Blue/Cyan Gradient for Text Generation Actions
    const primaryButtonClass = 'w-full py-3 mt-6 rounded-lg font-semibold transition-all text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400';
    const secondaryText = 'text-gray-400';

    const handleGenerate = () => {
        // Mock generation logic
        setIsLoading(true);
        setTimeout(() => {
            setTitles([
                `10 Ways to Master the Art of ${topic}`,
                `The Ultimate Guide to ${topic} in 2024`,
                `Why ${topic} is the Biggest Trend You Can't Ignore`,
                `A Beginner's Journey: Getting Started with ${topic}`
            ]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className={mainBackground}>
            <h1 className='text-3xl font-bold text-white mb-6'>
                Blog Titles Generator 🏷️
            </h1>
            
            <div className='flex flex-col lg:flex-row gap-6 h-[80%]'>
                
                {/* Input Panel - Responsive width */}
                <div className='w-full lg:w-1/3'>
                    <div className={panelClasses}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Input Topic</h2>
                        
                        <label htmlFor="topic" className={`block text-sm font-medium mb-2 ${secondaryText}`}>
                            Topic / Focus Keyword
                        </label>
                        <input
                            id="topic"
                            type="text"
                            placeholder="e.g., Remote Work Productivity"
                            className={inputClasses}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />

                        <button 
                            onClick={handleGenerate} 
                            disabled={isLoading}
                            className={`${primaryButtonClass} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    Generating... <Hash className='w-4 h-4 animate-spin' />
                                </span>
                            ) : "Generate Titles"}
                        </button>
                    </div>
                </div>

                {/* Output Panel - Responsive width and overflow */}
                <div className='w-full lg:w-2/3'>
                    <div className={`${panelClasses} overflow-y-auto`}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Generated Titles</h2>
                        
                        <div className="text-gray-300">
                            {titles.length > 0 ? (
                                <ul className='space-y-4'>
                                    {titles.map((title, index) => (
                                        <li key={index} className='p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-indigo-500 transition-colors'>
                                            <span className='font-bold text-indigo-400 mr-2'>{index + 1}.</span> {title}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">Your creative titles will appear here after generation...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogTitles;