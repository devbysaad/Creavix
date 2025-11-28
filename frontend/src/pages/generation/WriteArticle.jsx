import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Sparkles } from 'lucide-react';

const WriteArticle = () => {
    const [topic, setTopic] = useState('');
    const [article, setArticle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = () => {
        // Placeholder function - implement your API call here
        setIsLoading(true);
        setTimeout(() => {
            setArticle(`# ${topic}\n\nThis is a placeholder article. Implement your API call to generate real content.`);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-4 border-black">
                    <div className="p-3 bg-blue-600 border-4 border-black">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-mono font-black text-black tracking-tight uppercase'>
                        Write Full Article
                    </h1>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>

                    {/* Input Panel */}
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                        <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
                            <h2 className='text-lg font-mono font-black text-black mb-8 flex items-center gap-2 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Article Parameters
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="topic" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                        Topic / Keyword
                                    </label>
                                    <input
                                        id="topic"
                                        type="text"
                                        placeholder="E.G., THE FUTURE OF AI"
                                        className="w-full p-4 rounded-none bg-white border-4 border-black text-black placeholder-black/40 focus:border-blue-600 transition-all text-sm font-mono uppercase tracking-wide focus:outline-none"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="style" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                        Writing Style
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="style"
                                            className="w-full p-4 rounded-none bg-white border-4 border-black text-black focus:border-blue-600 appearance-none cursor-pointer font-mono font-bold uppercase tracking-wide focus:outline-none"
                                        >
                                            <option className='bg-white'>Professional</option>
                                            <option className='bg-white'>Casual</option>
                                            <option className='bg-white'>Technical</option>
                                            <option className='bg-white'>Creative</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className={`w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4
                                        ${isLoading
                                            ? 'bg-black border-black cursor-not-allowed opacity-70'
                                            : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 active:scale-95'
                                        }`}
                                >
                                    {isLoading ? (
                                        <>
                                            Generating... <Sparkles className='w-5 h-5 animate-spin' />
                                        </>
                                    ) : (
                                        <>
                                            Generate Article <Sparkles className='w-5 h-5' />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-y-auto">
                            <h2 className='text-lg font-mono font-black text-black mb-8 sticky top-0 bg-white py-2 -mt-2 z-10 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Generated Content
                            </h2>

                            <div className="prose prose-lg max-w-none text-black font-mono">
                                {article ? (
                                    <Markdown>{article}</Markdown>
                                ) : (
                                    <div className='h-full flex flex-col items-center justify-center text-center p-10 opacity-50'>
                                        <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center mb-6">
                                            <Sparkles className='w-10 h-10 text-white' />
                                        </div>
                                        <p className="text-black font-mono font-bold uppercase tracking-wider">Your generated article will appear here...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteArticle;