// pages/generation/ReviewResume.jsx
import React, { useState } from 'react';
import { FileText, Sparkles, Upload, X } from 'lucide-react';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const ReviewResume = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth();

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        
        if (!selectedFile) return;

        // Validate file type - TXT ONLY
        if (selectedFile.type !== 'text/plain') {
            toast.error('Only .txt files are supported');
            e.target.value = ''; // Reset input
            return;
        }

        // Validate file size (5MB)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (selectedFile.size > MAX_SIZE) {
            toast.error('File size must be less than 5MB');
            e.target.value = ''; // Reset input
            return;
        }

        setFile(selectedFile);
        toast.success('Resume uploaded!');
    };

    // Remove selected file
    const handleRemoveFile = () => {
        setFile(null);
        const fileInput = document.getElementById('resume-file');
        if (fileInput) fileInput.value = '';
    };

    // Submit resume for review
    const handleReview = async () => {
        if (!file) {
            toast.error('Please upload your resume first');
            return;
        }

        try {
            setIsLoading(true);

            // Create FormData
            const formData = new FormData();
            formData.append('resume', file);
            
            if (jobDescription.trim()) {
                formData.append('jobDescription', jobDescription.trim());
            }

            // API call
            const token = await getToken();
            const { data } = await api.post('/api/ai/review-resume', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (data.success) {
                setReview(data.content);
                toast.success('Resume reviewed successfully!');
            } else {
                toast.error(data.message || 'Failed to review resume');
            }

        } catch (error) {
            console.error('Resume Review Error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to review resume';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                
                {/* Header */}
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
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Upload Resume
                            </h2>

                            {/* File Upload Section */}
                            <div className="mb-6">
                                <label htmlFor="resume-file" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                    Upload Resume (TXT only)
                                </label>
                                
                                {!file ? (
                                    <label 
                                        htmlFor="resume-file" 
                                        className="flex flex-col items-center justify-center h-32 border-4 border-dashed border-black rounded-none cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <Upload className='w-8 h-8 text-black mb-2' />
                                        <p className="text-xs font-mono font-bold text-black uppercase tracking-wide">
                                            Click to upload
                                        </p>
                                        <p className="text-xs font-mono text-black/60 mt-1 uppercase tracking-wide">
                                            TXT only, max 5MB
                                        </p>
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-between p-4 border-4 border-black bg-white">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <FileText className="w-5 h-5 text-black flex-shrink-0" />
                                            <span className="text-sm font-mono font-bold text-black truncate">
                                                {file.name}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleRemoveFile}
                                            className="ml-2 p-1 hover:bg-red-600 hover:text-white transition-colors border-2 border-black"
                                            title="Remove file"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                
                                <input
                                    id="resume-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".txt,text/plain"
                                />
                            </div>

                            {/* Job Description */}
                            <div className="mb-6">
                                <label htmlFor="job-description" className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                                    Target Job Description (Optional)
                                </label>
                                <textarea
                                    id="job-description"
                                    rows="6"
                                    placeholder="PASTE JOB DESCRIPTION HERE FOR BETTER REVIEW..."
                                    className="w-full p-4 rounded-none bg-white border-4 border-black text-black placeholder-black/40 focus:border-blue-600 transition-all resize-none text-sm font-mono uppercase tracking-wide focus:outline-none"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleReview}
                                disabled={isLoading || !file}
                                className={`w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 
                                    ${isLoading || !file 
                                        ? 'bg-black border-black cursor-not-allowed opacity-70' 
                                        : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        Reviewing... <Sparkles className='w-5 h-5 animate-spin' />
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className='w-5 h-5' />
                                        Get AI Review
                                    </>
                                )}
                            </button>

                            {/* Info Box */}
                            <div className="mt-6 p-4 rounded-none bg-yellow-50 border-2 border-black font-mono uppercase tracking-wide text-black text-xs space-y-2">
                                <p className="font-bold">📄 TXT FILES ONLY</p>
                                <p className="text-black/80">
                                    To convert PDF: Open it → Select all (Ctrl+A) → Copy → Paste into Notepad → Save as .txt
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
                        <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-y-auto">
                            <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                                Review Summary
                            </h2>

                            <div className="text-black font-mono min-h-[300px]">
                                {review ? (
                                    <div className="prose prose-sm prose-black max-w-none">
                                        <Markdown>{review}</Markdown>
                                    </div>
                                ) : (
                                    <div className='text-center p-10'>
                                        <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center mx-auto mb-6">
                                            <FileText className='w-10 h-10 text-white' />
                                        </div>
                                        <p className="text-black font-mono font-bold uppercase tracking-wider opacity-50">
                                            Your comprehensive resume review will appear here...
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

export default ReviewResume;