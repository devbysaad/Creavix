import React, { useState } from 'react'
import { Eraser } from 'lucide-react'

const RemoveBG = () => {
  const [file, setFile] = useState(null)

  // Classes
  const mainContainerClasses =
    'flex flex-col lg:flex-row gap-6 p-6 bg-black h-[100%] m-5  overflow-y-scroll'
  const panelClasses =
    'w-full p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-lg flex flex-col'
  const inputClasses =
    'w-full p-3 px-4 mt-2 outline-none text-sm rounded-lg border border-gray-700 text-gray-400 bg-gray-800'
  const buttonGradientClasses =
    'bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 shadow-teal-500/30'
  const primaryAccent = 'text-green-400'

  const onSubmitHandler = (e) => {
    e.preventDefault()
    // Placeholder for submit logic
  }

  return (
    <div className={mainContainerClasses}>
      {/* Left Column (Input) */}
      <form
        onSubmit={onSubmitHandler}
        className={`lg:w-1/2 xl:w-1/3 ${panelClasses} h-[80%]`}
      >
        <div className="flex items-center gap-3 mb-6">
          <Eraser className={`w-6 h-6 ${primaryAccent}`} />
          <h1 className="text-2xl font-semibold text-white">
            Remove Background
          </h1>
        </div>
        <label className="mt-4 text-sm font-medium text-gray-300">
          Upload image
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          className={inputClasses}
        />
        <p className="mt-1 text-xs text-gray-500">
          Supports JPG, PNG, and other image formats
        </p>
        <button
          type="submit"
          className={`mt-8 w-full flex justify-center items-center gap-2 ${buttonGradientClasses} text-white px-4 py-3 rounded-lg text-base font-semibold transition-all active:scale-[0.98] shadow-lg`}
        >
          <Eraser className="w-5 h-5" />
          Remove background
        </button>
      </form>
      {/* Right Column (Output) */}
      <div className={`flex-1 ${panelClasses} h-[80%]`}>
        <div className="flex items-center gap-3 mb-4">
          <Eraser className={`w-5 h-5 ${primaryAccent}`} />
          <h1 className="text-lg font-semibold text-white">
            Processed Image
          </h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
            <Eraser className="w-10 h-10 text-gray-700" />
            <p>Upload an image and click &quot;Remove Background&quot; to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBG