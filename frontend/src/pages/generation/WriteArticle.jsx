// src/pages/generation/WriteArticle.jsx
import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const WriteArticle = () => {
    const [topic, setTopic] = useState('');
    const [article, setArticle] = useState('');
    const [length, setLength] = useState(1000);
    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!topic.trim()) {
            toast.error('Please enter a topic');
            return;
        }

        try {
            setIsLoading(true);
            const prompt = `Write an article about ${topic} in ${length} words`;
            
            const token = await getToken();
            const { data } = await api.post('/api/ai/generate-article', 
                { prompt, length }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (data.success) {
                setArticle(data.content);
                toast.success('Article generated successfully!');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
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

                <form onSubmit={onSubmit} className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                        <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
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
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="length" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                        Article Length
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="length"
                                            value={length}
                                            onChange={(e) => setLength(Number(e.target.value))}
                                            className="w-full p-4 rounded-none bg-white border-4 border-black text-black focus:border-blue-600 appearance-none cursor-pointer font-mono font-bold uppercase tracking-wide focus:outline-none"
                                        >
                                            <option value={500}>Short (500 words)</option>
                                            <option value={1000}>Medium (1000 words)</option>
                                            <option value={1500}>Long (1500 words)</option>
                                            <option value={2000}>Very Long (2000 words)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4
                                        ${isLoading ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
                                >
                                    {isLoading ? (
                                        <>Generating... <Sparkles className='w-5 h-5 animate-spin' /></>
                                    ) : (
                                        <>Generate Article <Sparkles className='w-5 h-5' /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-y-auto">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
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
                </form>
            </div>
        </div>
    );
};

export default WriteArticle;