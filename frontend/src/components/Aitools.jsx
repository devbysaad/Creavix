import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Aitools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="bg-white py-24 relative overflow-hidden border-t-4 border-black">
      {/* Background decoration - removed gradient, replaced with solid line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-base font-mono font-bold text-blue-600 tracking-widest uppercase mb-4 border-4 border-blue-600 inline-block px-6 py-2'>
            Capabilities
          </h2>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-mono font-black text-black mb-8 tracking-tight uppercase'>
            Powerful AI Tools
          </h1>
          <p className='text-lg font-mono text-black leading-relaxed uppercase tracking-wide'>
            Access a complete suite of intelligent tools designed to create, refine, and elevate your content using advanced AI technology.
          </p>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              className='group relative p-8 rounded-none bg-white border-4 border-black hover:border-blue-600 shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden'
              onClick={() => user && navigate(tool.path)}
            >
              <div className="relative z-10">
                <div
                  className='w-16 h-16 p-4 rounded-none shadow-[4px_4px_0_0_#000000] mb-6 transform group-hover:scale-110 group-hover:shadow-[6px_6px_0_0_#000000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200 border-4 border-black bg-black'
                >
                  <tool.Icon className='w-full h-full text-white' />
                </div>

                <h3 className='text-xl font-mono font-black text-black mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-wider'>
                  {tool.title}
                </h3>

                <p className='text-black font-mono text-sm leading-relaxed uppercase tracking-wide'>
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default Aitools
