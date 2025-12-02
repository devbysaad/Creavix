// pages/generation/RemoveObject.jsx
import React, { useState } from 'react';
import { Scissors, Upload, Download, X, Save } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const RemoveObject = () => {
    const [file, setFile] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [objectToRemove, setObjectToRemove] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth();

    // Handle file upload
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files?.[0];
        
        if (!selectedFile) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(selectedFile.type)) {
            toast.error('Only JPG, JPEG, and PNG images are allowed');
            event.target.value = '';
            return;
        }

        // Validate file size (5MB)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (selectedFile.size > MAX_SIZE) {
            toast.error('File size must be less than 5MB');
            event.target.value = '';
            return;
        }

        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setOriginalImage(url);
        setResultImage(null);
        toast.success('Image uploaded!');
    };

    // Remove selected file
    const handleRemoveFile = () => {
        if (originalImage) {
            URL.revokeObjectURL(originalImage);
        }
        setFile(null);
        setOriginalImage(null);
        setResultImage(null);
        setObjectToRemove('');
        const fileInput = document.getElementById('file-upload');
        if (fileInput) fileInput.value = '';
    };

    // Remove object from image
    const handleRemove = async () => {
        if (!file) {
            toast.error('Please upload an image first');
            return;
        }

        if (!objectToRemove.trim()) {
            toast.error('Please describe what to remove');
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('image', file);
            formData.append('object', objectToRemove.trim());

            const token = await getToken();
            const { data } = await api.post('/api/ai/remove-object', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                setResultImage(data.content);
                toast.success('Object removed successfully!');
            } else {
                toast.error(data.message || 'Failed to remove object');
            }
        } catch (error) {
            console.error('Object Removal Error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to remove object';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Download image
    const handleDownload = async () => {
        if (!resultImage) return;

        try {
            const response = await fetch(resultImage);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `object-removed-${Date.now()}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('Image downloaded!');
        } catch (error) {
            console.error('Download Error:', error);
            toast.error('Failed to download image');
        }
    };

    // Save to gallery
    const handleSave = () => {
        if (!resultImage) return;
        toast.success('Image saved to your gallery!');
    };

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            if (originalImage) {
                URL.revokeObjectURL(originalImage);
            }
        };
    }, [originalImage]);

    return (
        <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                
                {/* Header */}
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
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Upload Image
                            </h2>

                            {/* File Upload */}
                            {!originalImage ? (
                                <label 
                                    htmlFor="file-upload" 
                                    className="flex flex-col items-center justify-center h-48 border-4 border-dashed border-black rounded-none cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <Upload className='w-10 h-10 text-black mb-3' />
                                    <p className="text-sm font-mono font-bold text-black uppercase tracking-wide">
                                        Click to upload
                                    </p>
                                    <p className="text-xs font-mono text-black/60 mt-2 uppercase tracking-wide">
                                        PNG, JPG (max 5MB)
                                    </p>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        accept="image/jpeg,image/jpg,image/png"
                                    />
                                </label>
                            ) : (
                                <div className="relative border-4 border-black p-2 bg-white">
                                    <img 
                                        src={originalImage} 
                                        alt="Preview" 
                                        className="w-full h-48 object-cover" 
                                    />
                                    <button
                                        onClick={handleRemoveFile}
                                        className="absolute top-3 right-3 p-1 bg-red-600 border-2 border-black text-white hover:bg-red-700 transition-colors"
                                        title="Remove image"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    {file && (
                                        <div className="mt-2 text-xs font-mono text-black/60 uppercase text-center">
                                            {file.name} • {(file.size / 1024).toFixed(1)} KB
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Object to Remove Input */}
                            <div className="mt-6">
                                <label htmlFor="object" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                    What to Remove?
                                </label>
                                <input
                                    id="object"
                                    type="text"
                                    placeholder="E.G., PERSON, CAR, LOGO"
                                    className="w-full p-4 rounded-none bg-white border-4 border-black text-black placeholder-black/40 focus:border-blue-600 transition-all text-sm font-mono uppercase tracking-wide focus:outline-none"
                                    value={objectToRemove}
                                    onChange={(e) => setObjectToRemove(e.target.value)}
                                    disabled={!originalImage}
                                />
                            </div>

                            {/* Premium Feature Notice */}
                            <div className="mt-4 p-4 rounded-none bg-yellow-50 border-2 border-black font-mono uppercase tracking-wide text-black text-xs">
                                <p className="font-bold">⚠️ Premium Feature</p>
                                <p className="mt-1 text-black/80">
                                    Describe the object you want to remove from the image.
                                </p>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={handleRemove}
                                disabled={isLoading || !originalImage || !objectToRemove.trim()}
                                className={`mt-6 w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 
                                    ${isLoading || !originalImage || !objectToRemove.trim()
                                        ? 'bg-black border-black cursor-not-allowed opacity-70' 
                                        : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        Removing... <Scissors className='w-5 h-5 animate-spin' />
                                    </>
                                ) : (
                                    <>
                                        <Scissors className='w-5 h-5' />
                                        Remove Object
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] flex flex-col">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Result Image
                            </h2>

                            <div className='flex-1 flex justify-center items-center min-h-[300px] relative'>
                                {resultImage ? (
                                    /* Result Image with Actions */
                                    <div className="w-full h-full flex flex-col">
                                        <div className="flex-1 flex justify-center items-center">
                                            <img
                                                src={resultImage}
                                                alt="Object Removed"
                                                className='max-w-full max-h-full object-contain border-4 border-black'
                                            />
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 mt-6 justify-center">
                                            <button
                                                onClick={handleDownload}
                                                className="px-6 py-3 bg-blue-600 border-4 border-black rounded-none shadow-[4px_4px_0_0_#000000] hover:bg-black hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                                                title="Download Image"
                                            >
                                                <Download className="w-5 h-5 text-white" />
                                                <span className="font-mono font-black text-white uppercase text-sm">
                                                    Download
                                                </span>
                                            </button>

                                            <button
                                                onClick={handleSave}
                                                className="px-6 py-3 bg-black border-4 border-black rounded-none shadow-[4px_4px_0_0_#000000] hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                                                title="Save to Gallery"
                                            >
                                                <Save className="w-5 h-5 text-white" />
                                                <span className="font-mono font-black text-white uppercase text-sm">
                                                    Save
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ) : originalImage ? (
                                    /* Original Image Preview */
                                    <div className='relative w-full h-full flex justify-center items-center'>
                                        <img
                                            src={originalImage}
                                            alt="Original Image"
                                            className='max-w-full max-h-full object-contain border-4 border-blue-600'
                                        />
                                        <div className='absolute bottom-4 right-4 text-sm font-mono font-black text-white bg-black border-2 border-black px-4 py-2 uppercase tracking-wide'>
                                            Original Image
                                        </div>
                                    </div>
                                ) : (
                                    /* Empty State */
                                    <div className='text-center p-10'>
                                        <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center mx-auto mb-6">
                                            <Scissors className='w-10 h-10 text-white' />
                                        </div>
                                        <p className="font-mono font-bold uppercase tracking-wider text-black max-w-md">
                                            Upload an image to start removing objects
                                        </p>
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