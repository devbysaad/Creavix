// src/pages/generation/RemoveBG.jsx
import React, { useState } from 'react';
import { Eraser, Download, Upload, X, Save } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

const RemoveBG = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Only JPG, JPEG, and PNG images are allowed');
      e.target.value = '';
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (selectedFile.size > MAX_SIZE) {
      toast.error('File size must be less than 5MB');
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
    
    setResult(null);
    toast.success('Image uploaded!');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    const fileInput = document.getElementById('image-file');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('image', file);

      const token = await getToken();
      const { data } = await api.post('/api/ai/remove-background', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        setResult(data.content);
        toast.success('Background removed successfully!');
      } else {
        toast.error(data.message || 'Failed to remove background');
      }
    } catch (error) {
      console.error('Background Removal Error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove background';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      const response = await fetch(result);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bg-removed-${Date.now()}.png`;
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

  const handleSave = () => {
    if (!result) return;
    toast.success('Image saved to your gallery!');
  };

  return (
    <div className="h-full overflow-y-auto p-6 sm:p-8 bg-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-4 border-black">
          <div className="p-3 bg-blue-600 border-4 border-black">
            <Eraser className="w-8 h-8 text-white" />
          </div>
          <h1 className='text-2xl sm:text-3xl font-mono font-black text-black tracking-tight uppercase'>
            Remove Background
          </h1>
        </div>

        <div className='flex flex-col lg:flex-row gap-8 flex-1 min-h-0'>
          
          <form onSubmit={handleSubmit} className='w-full lg:w-1/3 flex flex-col gap-6'>
            <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
              <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                Upload Image
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                  Select Image
                </label>

                {!file ? (
                  <label 
                    htmlFor="image-file"
                    className="flex flex-col items-center justify-center h-40 border-4 border-dashed border-black rounded-none cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Upload className='w-10 h-10 text-black mb-3' />
                    <p className="text-sm font-mono font-bold text-black uppercase tracking-wide">
                      Click to upload
                    </p>
                    <p className="text-xs font-mono text-black/60 mt-2 uppercase tracking-wide">
                      JPG, PNG (max 5MB)
                    </p>
                  </label>
                ) : (
                  <div className="space-y-3">
                    {preview && (
                      <div className="relative border-4 border-black p-2">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-1 right-1 p-1 bg-red-600 border-2 border-black text-white hover:bg-red-700 transition-colors"
                          title="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-3 border-2 border-black bg-white">
                      <span className="text-xs font-mono font-bold text-black truncate">
                        {file.name}
                      </span>
                      <span className="text-xs font-mono text-black/60 ml-2">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                )}
                
                <input
                  id="image-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/jpg,image/png"
                />
              </div>

              <p className="text-xs font-mono uppercase text-black/60 tracking-wide mb-6">
                Supports JPG, PNG formats up to 5MB
              </p>

              <button
                type="submit"
                disabled={isLoading || !file}
                className={`w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 
                  ${isLoading || !file ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
              >
                <Eraser className="w-5 h-5" />
                {isLoading ? 'Removing...' : 'Remove Background'}
              </button>
            </div>
          </form>

          <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
            <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] flex flex-col">
              <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                Processed Image
              </h2>

              <div className="flex-1 flex justify-center items-center min-h-[400px] relative">
                {result ? (
                  <div className="relative w-full h-full flex flex-col">
                    <div className="flex-1 flex justify-center items-center">
                      <img 
                        src={result} 
                        alt="Background Removed" 
                        className="max-w-full max-h-full object-contain border-4 border-black" 
                      />
                    </div>

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
                ) : (
                  <div className="text-center flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center">
                      <Eraser className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-mono font-bold uppercase tracking-wider text-black max-w-md">
                      Upload an image and click "Remove Background" to get started
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

export default RemoveBG;