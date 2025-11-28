import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

const ReviewResume = () => {
    const [resumeText, setResumeText] = useState('');
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReview = () => {
        setIsLoading(true);
        setTimeout(() => {
            setReview("## Resume Review Summary\\n\\n- **Strengths:** Excellent technical skills, clear experience section.\\n- **Suggestions:** Quantify achievements with metrics (e.g., 'Increased revenue by 15%').\\n- **Formatting:** Ensure consistent date formats throughout.");
            setIsLoading(false);
        }, 2500);
    };

    return (
        <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-4 border-black">
                    <div className="p-3 bg-black border-4 border-black">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-mono font-black text-black tracking-tight uppercase'>
                        Resume Reviewer
                    </h1>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>
                    {/* Input Panel */}
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                        <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>Paste Resume Text</h2>

                            <label htmlFor="resume" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                Copy/Paste Your Resume Content
                            </label>
                            <textarea
                                id="resume"
                                rows="10"
                                placeholder="START PASTING YOUR RESUME TEXT HERE..."
                                className="w-full p-4 rounded-none bg-white border-4 border-black text-black placeholder-black/40 focus:border-blue-600 transition-all resize-none font-mono uppercase tracking-wide focus:outline-none"
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            />

                            <button
                                onClick={handleReview}
                                disabled={isLoading}
                                className={`mt-8 w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 ${isLoading ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        Reviewing... <FileText className='w-5 h-5 animate-pulse' />
                                    </span>
                                ) : "Get AI Review"}
                            </button>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-y-auto">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>Review Summary</h2>

                            <div className="text-black font-mono min-h-[300px]">
                                {review ? (
                                    <Markdown className="uppercase tracking-wide">{review}</Markdown>
                                ) : (
                                    <p className="text-black font-mono font-bold uppercase tracking-wider opacity-50 text-center py-10">Your comprehensive resume review will appear here...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewResume;