import React from 'react'
import { dummyTestimonialData } from '../assets/assets'

const UserTestmionial = () => {
  return (
    <div className="bg-black py-20">
      {/* Heading */}
      <div className='flex justify-center items-center flex-col text-center mt-0 px-4'>
        <h1 className='text-3xl sm:text-4xl font-semibold text-white'>Loved by Creators</h1>
        <p className='font-thin text-sm sm:text-base mt-2 text-gray-400'>
          Don't just take our word for it. Here's what our<br className="hidden sm:block" /> 
          users are saying.
        </p>
      </div>

      {/* Testimonials */}
      <div className="overflow-hidden py-10 px-4">
        <div className="flex flex-wrap justify-center items-center gap-6">
          {dummyTestimonialData.slice(0, 3).map((data, index) => (
            <div
              key={index}
              className='p-8 w-full sm:w-72 lg:w-80 rounded-2xl bg-gray-900 shadow-md border border-gray-800 hover:-translate-y-1 hover:shadow-lg transition-all duration-300'
            >
              <h3 className="text-lg font-semibold text-white">{data.name}</h3>
              <p className="text-sm text-gray-400">{data.title}</p>
              <p className="text-gray-300 text-sm mt-4 leading-relaxed">
                "{data.content}"
              </p>
              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < data.rating ? "text-yellow-400" : "text-gray-700"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserTestmionial
