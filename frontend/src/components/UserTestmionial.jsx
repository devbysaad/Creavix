import React from 'react'
import { dummyTestimonialData } from '../assets/assets'

const UserTestmionial = () => {
  return (
    <div className="bg-white py-24 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-base font-mono font-bold text-blue-600 tracking-widest uppercase mb-4 border-4 border-blue-600 inline-block px-6 py-2'>
            Testimonials
          </h2>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-mono font-black text-black mb-8 tracking-tight uppercase'>
            Loved by Creators
          </h1>
          <p className='text-lg font-mono text-black leading-relaxed uppercase tracking-wide'>
            Don't just take our word for it. Join thousands of satisfied users who have transformed their content creation workflow.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyTestimonialData.slice(0, 3).map((data, index) => (
            <div
              key={index}
              className='p-8 rounded-none bg-white border-4 border-black shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200'
            >
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-black">
                <div className="w-14 h-14 rounded-none bg-black border-2 border-black flex items-center justify-center text-white font-mono font-black text-2xl">
                  {data.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-mono font-black text-black uppercase tracking-wider">{data.name}</h3>
                  <p className="text-sm font-mono text-black uppercase tracking-wide">{data.title}</p>
                </div>
              </div>

              <div className="flex mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < data.rating ? "text-blue-600" : "text-black/20"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-black font-mono text-base leading-relaxed uppercase tracking-wide">
                "{data.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default UserTestmionial
