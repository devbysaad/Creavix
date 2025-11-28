import React, { useState } from 'react'
import { Eraser } from 'lucide-react'

const RemoveBG = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setResult('https://via.placeholder.com/800x600/FFFFFF/000000?text=Background+Removed')
      setIsLoading(false)
    }, 2000)
  }

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
          {/* Input Panel */}
          <form onSubmit={onSubmitHandler} className='w-full lg:w-1/3 flex flex-col gap-6'>
            <div className="bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000]">
              <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                Upload Image
              </h2>

              <label className="block text-sm font-mono font-bold text-black mb-3 uppercase tracking-wide">
                Upload image
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                className="w-full p-4 rounded-none bg-white border-4 border-black text-black focus:border-blue-600 transition-all font-mono focus:outline-none"
              />
              <p className="mt-3 text-xs font-mono uppercase text-black/60 tracking-wide">
                Supports JPG, PNG, and other image formats
              </p>

              <button
                type="submit"
                className={`mt-8 w-full py-4 rounded-none font-mono font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#000000] transition-all duration-200 flex items-center justify-center gap-2 border-4 ${isLoading ? 'bg-black border-black cursor-not-allowed opacity-70' : 'bg-black border-black hover:bg-blue-600 hover:border-blue-600 hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1'}`}
                disabled={isLoading}
              >
                <Eraser className="w-5 h-5" />
                {isLoading ? 'Removing...' : 'Remove background'}
              </button>
            </div>
          </form>

          {/* Output Panel */}
          <div className='w-full lg:w-2/3 flex-1 min-h-[500px] lg:min-h-0'>
            <div className="h-full bg-white border-4 border-black rounded-none p-8 shadow-[8px_8px_0_0_#000000] overflow-y-auto">
              <h2 className='text-lg font-mono font-black text-black mb-8 uppercase tracking-wider border-b-2 border-black pb-3'>
                Processed Image
              </h2>

              <div className="flex-1 flex justify-center items-center min-h-[400px]">
                {result ? (
                  <img src={result} alt="Result" className="max-w-full border-4 border-black" />
                ) : (
                  <div className="text-center flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-black border-4 border-black rounded-none flex items-center justify-center">
                      <Eraser className="w-10 h-10 text-white" />
                    </div>
                    <p className="font-mono font-bold uppercase tracking-wider text-black">Upload an image and click "Remove Background" to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBG