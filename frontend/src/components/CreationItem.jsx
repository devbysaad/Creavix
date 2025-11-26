import React, { useState } from 'react';
import Markdown from 'react-markdown'

const CreationItem = ({ item, onClick }) => {
    const [expand, setexpand] = useState(false)
    
    // --- Dark Theme Classes ---
    const cardBaseClasses = "flex flex-col p-6 sm:p-8 mb-4 sm:mb-6 w-[90%] rounded-xl bg-gray-800 border border-gray-700 shadow-xl shadow-black/30 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer";
    const promptTextClasses = "text-xl sm:text-2xl font-semibold text-white leading-snug truncate w-4/5";
    const metadataTextClasses = "mt-2 text-gray-400 text-sm sm:text-base";
    // UPDATED: Type Button uses a Green/Teal gradient
    const buttonClasses = "bg-gradient-to-r from-green-600 to-teal-500 text-white px-5 py-2 rounded-full text-sm sm:text-base font-medium hover:from-green-500 hover:to-teal-400 transition-colors shadow-lg shadow-black/20";
    const expandedContentClasses = 'mt-3 h-full overflow-y-scroll text-sm text-gray-300';
    // ---

    return (
        <div 
            className={cardBaseClasses}
            onClick={onClick} 
        >
            {/* Prompt */}
            <h2 onClickCapture={(e) => {
                e.stopPropagation(); 
                setexpand(!expand);
            }}
                className={promptTextClasses}
                title={item.prompt}
            >
                {item.prompt}
            </h2>

            <p className={metadataTextClasses}>
                {item.type} • {new Date(item.created_at).toLocaleDateString()}
            </p>

            {/* Type Button (Green/Teal Gradient) */}
            <div className="mt-4 flex justify-start">
                <button className={buttonClasses}>
                    {item.type}
                </button>
            </div>
            
            {/* Expanded Content Area */}
            { expand && (
                <div>
                    {item.type === 'image' ? (
                        <div>
                            <img src={item.content} alt="Generated image" className='mt-5 w-full max-w-lg rounded-xl shadow-lg border border-gray-700' />
                        </div>
                    ) : (
                        <div className={expandedContentClasses}>
                            <div className='rest-tw'>
                                <Markdown>
                                    {String(item.content || "").trim()}
                                </Markdown>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreationItem;