import React from 'react'
import { dummyTestimonialData } from '../assets/assets'

const UserTestmionial = () => {
  return (
    <div>
      {/* Heading */}
      <div className='flex justify-center items-center flex-col text-center mt-20 px-4'>
        <h1 className='text-3xl sm:text-4xl font-semibold text-black'>Loved by Creators</h1>
        <p className='font-thin text-sm sm:text-base mt-2'>
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
              className="
                p-8 
                w-full 
                sm:w-72 
                lg:w-80 
                rounded-2xl 
                bg-[#FDFDFF] 
                shadow-lg 
                border border-gray-100
                hover:-translate-y-1 
                transition-all duration-300
              "
            >
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <p className="text-sm text-gray-500">{data.title}</p>

              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                "{data.content}"
              </p>

              <div className="flex mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < data.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
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
