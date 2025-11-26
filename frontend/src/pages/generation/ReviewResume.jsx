import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

const ReviewResume = () => {
    const [resumeText, setResumeText] = useState('');
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --- Theme Classes ---
    const mainBackground = 'h-[100%] m-5  overflow-y-scroll p-6 bg-black';
    const panelClasses = 'bg-gray-900 border border-gray-800 rounded-xl p-6 h-full shadow-lg';
    const inputClasses = 'w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500';
    // Blue/Cyan Gradient for Text Generation Actions
    const primaryButtonClass = 'w-full py-3 mt-6 rounded-lg font-semibold transition-all text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400';
    const secondaryText = 'text-gray-400';
    const outputContent = 'text-gray-300 min-h-[300px]';

    const handleReview = () => {
        // Mock review logic
        setIsLoading(true);
        setTimeout(() => {
            setReview("## Resume Review Summary\n\n- **Strengths:** Excellent technical skills, clear experience section.\n- **Suggestions:** Quantify achievements with metrics (e.g., 'Increased revenue by 15%').\n- **Formatting:** Ensure consistent date formats throughout.");
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className={mainBackground}>
            <h1 className='text-3xl font-bold text-white mb-6'>
                Resume Reviewer 📋
            </h1>
            
            <div className='flex flex-col lg:flex-row gap-6 h-[80%]'>
                
                {/* Input Panel - Responsive width */}
                <div className='w-full lg:w-1/3'>
                    <div className={panelClasses}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Paste Resume Text</h2>
                        
                        <label htmlFor="resume" className={`block text-sm font-medium mb-2 ${secondaryText}`}>
                            Copy/Paste Your Resume Content
                        </label>
                        <textarea
                            id="resume"
                            rows="10"
                            placeholder="Start pasting your resume text here..."
                            className={`${inputClasses} resize-none`}
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                        />

                        <button 
                            onClick={handleReview} 
                            disabled={isLoading}
                            className={`${primaryButtonClass} ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    Reviewing... <FileText className='w-4 h-4 animate-pulse' />
                                </span>
                            ) : "Get AI Review"}
                        </button>
                    </div>
                </div>

                {/* Output Panel - Responsive width and overflow */}
                <div className='w-full lg:w-2/3'>
                    <div className={`${panelClasses} overflow-y-auto`}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Review Summary</h2>
                        
                        <div className={outputContent}>
                            {review ? (
                                <Markdown className="markdown-dark-theme">{review}</Markdown>
                            ) : (
                                <p className="text-gray-500 italic">Your comprehensive resume review will appear here...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewResume;