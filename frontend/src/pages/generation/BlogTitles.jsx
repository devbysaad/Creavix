import React, { useState } from 'react';
import { Hash, Sparkles } from 'lucide-react';

const BlogTitles = () => {
    const [topic, setTopic] = useState('');
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
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
        <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-4 border-black">
                    <div className="p-3 bg-black border-4 border-black">
                        <Hash className="w-8 h-8 text-white" />
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-mono font-black text-black tracking-tight uppercase'>
                        Blog Titles Generator
                    </h1>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>

                    {/* Input Panel */}
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                        <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>Input Topic</h2>

                            <label htmlFor="topic" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                Topic / Focus Keyword
                            </label>
                            <input
                                id="topic"
                                type="text"
                                placeholder="E.G., REMOTE WORK PRODUCTIVITY"
                                className="w-full p-4 rounded-none bg-white border-4 border-black text-black placeholder-black/40 focus:border-blue-600 transition-all text-sm font-mono uppercase tracking-wide focus:outline-none mb-6"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />

                            <button
                                onClick={handleGenerate}
                                disabled={isLoading}
                                className={`w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 ${isLoading ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        Generating... <Hash className='w-5 h-5 animate-spin' />
                                    </span>
                                ) : "Generate Titles"}
                            </button>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-y-auto">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>Generated Titles</h2>

                            <div className="text-black font-mono">
                                {titles.length > 0 ? (
                                    <ul className='space-y-4'>
                                        {titles.map((title, index) => (
                                            <li key={index} className='p-4 bg-white border-4 border-black rounded-none hover:border-blue-600 transition-colors shadow-[4px_4px_0_0_#000000]'>
                                                <span className='font-black text-blue-600 mr-3 text-lg'>{index + 1}.</span>
                                                <span className="font-bold uppercase tracking-wide">{title}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-black font-mono font-bold uppercase tracking-wider opacity-50 text-center py-10">Your creative titles will appear here after generation...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogTitles;