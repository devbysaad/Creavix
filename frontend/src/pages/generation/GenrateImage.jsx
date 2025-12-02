// src/pages/generation/GenerateImages.jsx
import React, { useState } from 'react';
import { Image, Sparkles } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const GenerateImages = () => {
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Cinematic');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [publish, setPublish] = useState(false);
    const { getToken } = useAuth();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a prompt');
            return;
        }

        try {
            setIsLoading(true);
            const fullPrompt = `${prompt}, ${style} style`;
            
            const token = await getToken();
            const { data } = await api.post('/api/ai/generate-image', 
                { prompt: fullPrompt, publish }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            if (data.success) {
                setImageUrl(data.content);
                toast.success('Image generated successfully!');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
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
                        Generate Images
                    </h1>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                        <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Configuration
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="prompt" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                        Detailed Description
                                    </label>
                                    <textarea
                                        id="prompt"
                                        rows="6"
                                        placeholder="E.G., A CYBERPUNK CITYSCAPE AT SUNSET"
                                        className="w-full p-4 rounded-none bg-white border-4 border-black text-black placeholder-black/40 focus:border-blue-600 transition-all resize-none text-sm font-mono uppercase tracking-wide focus:outline-none"
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="style" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                        Art Style
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="style"
                                            value={style}
                                            onChange={(e) => setStyle(e.target.value)}
                                            className="w-full p-4 rounded-none bg-white border-4 border-black text-black focus:border-blue-600 appearance-none cursor-pointer font-mono font-bold uppercase tracking-wide focus:outline-none"
                                        >
                                            <option>Cinematic</option>
                                            <option>Digital Art</option>
                                            <option>Watercolor</option>
                                            <option>Photorealistic</option>
                                            <option>Anime</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="publish"
                                        checked={publish}
                                        onChange={(e) => setPublish(e.target.checked)}
                                        className="w-5 h-5 border-4 border-black cursor-pointer"
                                    />
                                    <label htmlFor="publish" className="text-sm font-mono font-bold text-black uppercase tracking-wide cursor-pointer">
                                        Make Public
                                    </label>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                    className={`w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4
                                        ${isLoading ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
                                >
                                    {isLoading ? (
                                        <>Generating... <Sparkles className='w-5 h-5 animate-spin' /></>
                                    ) : (
                                        <>Generate Image <Sparkles className='w-5 h-5' /></>
                                    )}
                                </button>

                                {isLoading && (
                                    <p className="text-xs font-mono text-black/60 text-center uppercase">
                                        This may take up to 2 minutes...
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-2 shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
                            {imageUrl ? (
                                <div className="relative h-full w-full rounded-none overflow-hidden bg-white border-2 border-black">
                                    <img src={imageUrl} alt="Generated Result" className='w-full h-full object-contain' />
                                </div>
                            ) : (
                                <div className='h-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-none border-4 border-dashed border-black'>
                                    <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center mb-6">
                                        <Image className='w-10 h-10 text-white' />
                                    </div>
                                    <h3 className="text-xl font-mono font-black text-black mb-3 uppercase tracking-wider">Ready to Create</h3>
                                    <p className="text-black font-mono max-w-sm uppercase tracking-wide text-sm">
                                        Describe your vision in the prompt field and watch as AI brings it to life.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateImages;