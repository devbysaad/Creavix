import React, { useState } from 'react';
import { Scissors, Upload } from 'lucide-react';

const RemoveObject = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setOriginalImage(url);
            setResultImage(null);
        }
    };

    const handleRemove = () => {
        if (!originalImage) return;
        setIsLoading(true);
        setTimeout(() => {
            setResultImage('https://via.placeholder.com/800x600/FFFFFF/000000?text=Object+Removed');
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-4 border-black">
                    <div className="p-3 bg-black border-4 border-black">
                        <Scissors className="w-8 h-8 text-white" />
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-mono font-black text-black tracking-tight uppercase'>
                        Remove Object
                    </h1>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>
                    {/* Input Panel */}
                    <div className='w-full lg:w-1/3 flex flex-col gap-6'>
                        <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>Upload Image</h2>

                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center h-48 border-4 border-dashed border-black rounded-none cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                                <Upload className='w-10 h-10 text-black mb-3' />
                                <p className="text-sm font-mono font-bold text-black uppercase tracking-wide">Click to upload</p>
                                <p className="text-xs font-mono text-black/60 mt-2 uppercase tracking-wide">PNG, JPG, up to 10MB</p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept="image/png, image/jpeg"
                                />
                            </label>

                            <p className="text-sm mt-6 p-4 rounded-none bg-white border-2 border-black font-mono uppercase tracking-wide text-black text-xs">
                                Note: Once uploaded, mark the object you want to remove directly on the image.
                            </p>

                            <button
                                onClick={handleRemove}
                                disabled={isLoading || !originalImage}
                                className={`mt-8 w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 ${isLoading || !originalImage ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        Removing... <Scissors className='w-5 h-5 animate-spin' />
                                    </span>
                                ) : "Remove Object"}
                            </button>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-hidden flex flex-col">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>Result Image</h2>

                            <div className='flex justify-center items-center w-full flex-1 min-h-[300px]'>
                                {resultImage ? (
                                    <img
                                        src={resultImage}
                                        alt="Object Removal Result"
                                        className='max-w-full max-h-full object-contain border-4 border-black'
                                    />
                                ) : originalImage ? (
                                    <div className='relative w-full h-full flex justify-center items-center'>
                                        <img
                                            src={originalImage}
                                            alt="Original Image"
                                            className='max-w-full max-h-full object-contain border-4 border-blue-600'
                                        />
                                        <p className='absolute bottom-4 right-4 text-sm font-mono font-black text-white bg-black border-2 border-black px-3 py-1 uppercase tracking-wide'>Original Image</p>
                                    </div>
                                ) : (
                                    <div className='text-center p-10'>
                                        <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center mx-auto mb-6">
                                            <Scissors className='w-10 h-10 text-white' />
                                        </div>
                                        <p className="font-mono font-bold uppercase tracking-wider text-black">Upload an image to start removing objects.</p>
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

export default RemoveObject;