import React, { useState } from 'react';
import { Image, Sparkles } from 'lucide-react';

const GenerateImages = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --- Theme Classes ---
    const mainBackground = 'h-[100%] m-5 overflow-y-scroll p-6 bg-black';
    const panelClasses = 'bg-gray-900 border border-gray-800 rounded-xl p-6 h-full shadow-lg';
    const inputClasses = 'w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500';
    // Green/Teal Gradient for Image Actions
    const primaryButtonClass = 'w-full py-3 mt-6 rounded-lg font-semibold transition-all text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400';
    const secondaryText = 'text-gray-400';

    const handleGenerate = () => {
        // Mock generation logic
        setIsLoading(true);
        setTimeout(() => {
            // Placeholder Image URL
            setImageUrl('https://via.placeholder.com/800x600/1e293b/94a3b8?text=AI+Generated+Image'); 
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className={mainBackground}>
            <h1 className='text-3xl font-bold text-white mb-6'>
                Generate Images ✨
            </h1>
            
            <div className='flex flex-col lg:flex-row gap-6 h-[80%]'>
                
                {/* Input Panel - Responsive width */}
                <div className='w-full lg:w-1/3'>
                    <div className={panelClasses}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Image Prompt</h2>
                        
                        <label htmlFor="prompt" className={`block text-sm font-medium mb-2 ${secondaryText}`}>
                            Detailed Description
                        </label>
                        <textarea
                            id="prompt"
                            rows="4"
                            placeholder="e.g., A cyberpunk cityscape at sunset with flying cars and neon signs, digital art."
                            className={`${inputClasses} resize-none`}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />

                        <label htmlFor="style" className={`block text-sm font-medium mt-4 mb-2 ${secondaryText}`}>
                            Art Style
                        </label>
                        <select id="style" className={inputClasses}>
                            <option className='bg-gray-900'>Cinematic</option>
                            <option className='bg-gray-900'>Digital Art</option>
                            <option className='bg-gray-900'>Watercolor</option>
                        </select>

                        <button 
                            onClick={handleGenerate} 
                            disabled={isLoading}
                            className={`${primaryButtonClass} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    Generating... <Image className='w-4 h-4 animate-spin' />
                                </span>
                            ) : "Generate Image"}
                        </button>
                    </div>
                </div>

                {/* Output Panel - Responsive width and overflow */}
                <div className='w-full h-full  lg:w-2/3'>
                    <div className={`${panelClasses} flex justify-center items-center overflow-hidden`}>
                        <h2 className='text-xl font-semibold text-white absolute top-6 left-6 z-10'>Result</h2>
                        
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt="Generated Result" 
                                className='w-full h-full object-contain rounded-lg'
                            />
                        ) : (
                            <div className='text-center p-10'>
                                <Image className='w-16 h-16 text-gray-700 mx-auto mb-4' />
                                <p className="text-gray-500 italic">Your masterpiece will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateImages;