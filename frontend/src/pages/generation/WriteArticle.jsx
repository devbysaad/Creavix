import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Sparkles } from 'lucide-react';

const WriteArticle = () => {
    const [topic, setTopic] = useState('');
    const [article, setArticle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --- Theme Classes ---
    const mainBackground = 'h-[100%] m-5  overflow-y-scroll p-6 bg-black';
    const panelClasses = 'bg-gray-900 border border-gray-800 rounded-xl p-6 h-full shadow-lg';
    const inputClasses = 'w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500';
    // Blue/Cyan Gradient for Text Generation Actions
    const primaryButtonClass = 'w-full py-3 mt-6 rounded-lg font-semibold transition-all text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400';
    const secondaryText = 'text-gray-400';
    const outputContent = 'text-gray-300 min-h-[300px]';

    const handleGenerate = () => {
        // Mock generation logic
        setIsLoading(true);
        setTimeout(() => {
            setArticle(`## The Power of ${topic}\n\nThis is a fully AI-generated article demonstrating the **dark theme** and **responsive layout** of the application. The content area is scrollable and supports Markdown rendering for easy reading.`);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className={mainBackground}>
            <h1 className='text-3xl font-bold text-white mb-6'>
                Write Full Article 📝
            </h1>
            
            <div className='flex flex-col  h-[80] lg:flex-row gap-6 '>
                
                {/* Input Panel - Responsive width */}
                <div className='w-full lg:w-1/3'>
                    <div className={panelClasses}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Article Parameters</h2>
                        
                        <label htmlFor="topic" className={`block text-sm font-medium mb-2 ${secondaryText}`}>
                            Topic / Keyword
                        </label>
                        <input
                            id="topic"
                            type="text"
                            placeholder="e.g., The future of AI in content creation"
                            className={inputClasses}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />

                        <label htmlFor="style" className={`block text-sm font-medium mt-4 mb-2 ${secondaryText}`}>
                            Writing Style
                        </label>
                        <select
                            id="style"
                            className={inputClasses}
                        >
                            <option className='bg-gray-900'>Professional</option>
                            <option className='bg-gray-900'>Casual</option>
                            <option className='bg-gray-900'>Technical</option>
                        </select>

                        <button 
                            onClick={handleGenerate} 
                            disabled={isLoading}
                            className={`${primaryButtonClass} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    Generating... <Sparkles className='w-4 h-4 animate-pulse' />
                                </span>
                            ) : "Generate Article"}
                        </button>
                    </div>
                </div>

                {/* Output Panel - Responsive width and overflow */}
                <div className='w-full lg:w-2/3'>
                    <div className={`${panelClasses} overflow-y-auto`}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Generated Content</h2>
                        
                        <div className={outputContent}>
                            {article ? (
                                <Markdown className="markdown-dark-theme">{article}</Markdown>
                            ) : (
                                <p className="text-gray-500 italic">Your generated article will appear here...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteArticle;