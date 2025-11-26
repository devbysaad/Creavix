import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Aitools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="bg-black py-20">
      {/* Header */}
      <div className='flex justify-center items-center flex-col text-center mt-10 px-4 sm:px-6 lg:px-0 text-gray-200'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-white'>
          Powerful AI Tools
        </h1>
        <p className='font-light text-sm sm:text-base mt-2 sm:mt-4 text-gray-400'>
          Access a complete suite of intelligent tools designed to create, refine, and <br />
          elevate your content using advanced AI technology.
        </p>
      </div>

      {/* Cards */}
      <div className='flex justify-center mt-10 px-4 sm:px-6 lg:px-0'>
        <div className='flex flex-wrap justify-center gap-6'>
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className='p-6 sm:p-8 m-2 sm:m-4 w-full sm:w-64 md:w-72 lg:w-80 rounded-xl bg-gray-900 border border-gray-800 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer'
              onClick={() => user && navigate(tool.path)}
            >
              <tool.Icon
                className='w-12 h-12 p-3 text-white rounded-xl shadow-sm'
                style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
              />
              <h3 className='mt-4 sm:mt-6 mb-2 text-lg font-semibold text-white'>
                {tool.title}
              </h3>
              <p className='text-gray-400 text-sm sm:text-base'>
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Aitools
