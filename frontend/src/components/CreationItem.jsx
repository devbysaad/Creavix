import React, { useState } from 'react';
import Markdown from 'react-markdown'

const CreationItem = ({ item, onClick }) => {
    const [expand, setexpand] = useState(false)

    return (
        <div
            className="flex flex-col p-8 mb-8 w-full rounded-none bg-white border-4 border-black shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
            onClick={onClick}
        >
            {/* Prompt */}
            <div className="flex justify-between items-start gap-6">
                <h2 onClickCapture={(e) => {
                    e.stopPropagation();
                    setexpand(!expand);
                }}
                    className="text-lg sm:text-xl font-mono font-bold text-black leading-tight uppercase tracking-wider flex-1 group-hover:text-blue-600 transition-colors"
                    title={item.prompt}
                >
                    {item.prompt}
                </h2>

                <span className={`px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-widest border-2 ${item.type === 'image'
                    ? 'bg-black text-white border-black'
                    : 'bg-blue-600 text-white border-blue-600'
                    }`}>
                    {item.type}
                </span>
            </div>

            <p className="mt-4 text-black font-mono text-sm uppercase tracking-wide">
                {new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            {/* Expanded Content Area */}
            {expand && (
                <div className="mt-8 pt-8 border-t-4 border-black">
                    {item.type === 'image' ? (
                        <div className="flex justify-center bg-white p-4 border-4 border-black">
                            <img src={item.content} alt="Generated image" className='w-full max-w-2xl rounded-none border-2 border-black' />
                        </div>
                    ) : (
                        <div className="prose prose-lg max-w-none text-black font-mono">
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