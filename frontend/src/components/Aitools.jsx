import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Aitools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <>
      {/* AI Tools Header */}
      <div className='flex justify-center items-center flex-col text-center mt-10 px-4 sm:px-6 lg:px-0'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-black'>
          Powerful AI Tools
        </h1>
        <p className='font-thin text-sm sm:text-base mt-2 sm:mt-4'>
          Access a complete suite of intelligent tools designed to create, refine, and <br />
          elevate your content using advanced AI technology.
        </p>
      </div>

      {/* AI Tool Cards */}
      <div className='flex justify-center mt-10 px-4 sm:px-6 lg:px-0'>
        <div className='flex flex-wrap justify-center gap-6'>
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className='p-6 sm:p-8 m-2 sm:m-4 w-full sm:w-64 md:w-72 lg:w-80 rounded-lg bg-[#FDFDFF] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
              onClick={() => user && navigate(tool.path)}
            >
              <tool.Icon
                className='w-12 h-12 p-3 text-white rounded-xl'
                style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
              />
              <h3 className='mt-4 sm:mt-6 mb-2 text-lg font-semibold'>{tool.title}</h3>
              <p className='text-gray-400 text-sm sm:text-base'>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Aitools
