import React, { useLayoutEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const [creation, setCreation] = useState([]) 
  const { user } = useUser()

  const fetchCreation = async () => {
    setCreation(dummyPublishedCreationData)
  }

  useLayoutEffect(() => {
    if (user) {
      fetchCreation()
    }
  }, [user])

  return (
    <div className='flex-1 h-[80%]flex flex-col gap-4 p-6 bg-black'>
      <h2 className='text-2xl font-semibold text-white'>Community Creations</h2>

      <div className='bg-gray-900 h-full w-full rounded-xl border border-gray-800 overflow-y-scroll flex flex-wrap'>
        {creation.map((item, index) => (
          <div
            key={index}
            className='relative group p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'
          >
            <div className='relative w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all hover:scale-[1.01]'>
              <img
                src={item.content}
                alt={item.prompt || "Generated content"}
                className='w-full h-full aspect-square object-cover'
              />

              <div
                className={`absolute bottom-0 top-0 right-0 left-0 flex flex-col justify-end p-4 
                             bg-gradient-to-t from-black/80 to-transparent text-white 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <p className='text-sm font-medium mb-2 line-clamp-2'>{item.prompt}</p>

                <div className='flex justify-end items-center'>
                  <div className='flex gap-1 items-center'>
                    <p className='text-sm font-semibold text-gray-300'>{item.like?.length || 0}</p>

                    <Heart
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition-transform duration-200 
                                  ${item.like?.includes(user?.id)
                          ? "fill-indigo-400 text-indigo-500" // Indigo accent for filled state
                          : 'text-gray-300' 
                        }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community;