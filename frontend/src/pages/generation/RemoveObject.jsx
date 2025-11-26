import React, { useState } from 'react';
import { Scissors, Upload } from 'lucide-react';

const RemoveObject = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- Theme Classes ---
    const mainBackground = 'h-[100%] m-5  overflow-y-scroll p-6 bg-black';
    const panelClasses = 'bg-gray-900 border border-gray-800 rounded-xl p-6 h-full shadow-lg';
    const inputClasses = 'w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500';
    // Green/Teal Gradient for Image Actions
    const primaryButtonClass = 'w-full py-3 mt-6 rounded-lg font-semibold transition-all text-white bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400';
    const secondaryText = 'text-gray-400';
    const dropzoneClasses = 'flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors';

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setOriginalImage(url);
            setResultImage(null); // Clear previous result
        }
    };

    const handleRemove = () => {
        if (!originalImage) return;

        // Mock removal logic
        setIsLoading(true);
        setTimeout(() => {
            // Placeholder for the processed image
            setResultImage('https://via.placeholder.com/800x600/1e293b/94a3b8?text=Object+Removed+Image');
            setIsLoading(false);
        }, 3000);
    };

    return (
        <div className={mainBackground}>
            <h1 className='text-3xl font-bold text-white mb-6'>
                Remove Object ✂️
            </h1>
            
            <div className='flex flex-col lg:flex-row gap-6 h-[80%]'>
                
                {/* Input Panel - Responsive width */}
                <div className='w-full lg:w-1/3'>
                    <div className={panelClasses}>
                        <h2 className='text-xl font-semibold text-white mb-4'>Upload and Mark Image</h2>
                        
                        {/* File Upload Dropzone */}
                        <label htmlFor="file-upload" className={dropzoneClasses}>
                            <Upload className='w-8 h-8 text-gray-500 mb-2' />
                            <p className="text-sm text-gray-400">Drag 'n' drop or **click to upload**</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, up to 10MB</p>
                            <input 
                                id="file-upload" 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileUpload} 
                                accept="image/png, image/jpeg"
                            />
                        </label>

                        {/* Note on Marking Area */}
                        <p className={`text-sm mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700 ${secondaryText}`}>
                            **Note:** Once uploaded, you would typically **mark the object** you want to remove directly on the image in this panel. (The marking functionality is omitted here for simplicity).
                        </p>

                        <button 
                            onClick={handleRemove} 
                            disabled={isLoading || !originalImage}
                            className={`${primaryButtonClass} ${isLoading || !originalImage ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    Removing... <Scissors className='w-4 h-4 animate-spin' />
                                </span>
                            ) : "Remove Object"}
                        </button>
                    </div>
                </div>

                {/* Output Panel - Responsive width and overflow */}
                <div className='w-full lg:w-2/3'>
                    <div className={`${panelClasses} flex flex-col justify-start items-center overflow-hidden`}>
                        <h2 className='text-xl font-semibold text-white mb-4 w-full'>Result Image</h2>
                        
                        <div className='flex justify-center items-center w-full h-full min-h-[300px]'>
                            {resultImage ? (
                                <img 
                                    src={resultImage} 
                                    alt="Object Removal Result" 
                                    className='max-w-full max-h-full object-contain rounded-lg shadow-xl'
                                />
                            ) : originalImage ? (
                                <div className='relative w-full h-full flex justify-center items-center'>
                                    {/* Display uploaded image before processing */}
                                    <img 
                                        src={originalImage} 
                                        alt="Original Image" 
                                        className='max-w-full max-h-full object-contain rounded-lg border-2 border-indigo-500/50'
                                    />
                                    <p className='absolute bottom-2 right-2 text-sm text-indigo-400 bg-black/50 p-1 rounded'>Original Image</p>
                                </div>
                            ) : (
                                <div className='text-center p-10'>
                                    <Scissors className='w-16 h-16 text-gray-700 mx-auto mb-4' />
                                    <p className="text-gray-500 italic">Upload an image to start removing objects.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveObject;