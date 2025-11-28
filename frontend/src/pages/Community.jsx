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
    <div className='flex-1 min-h-screen flex flex-col gap-6 p-8 bg-white'>
      <h2 className='text-3xl font-mono font-black text-black uppercase tracking-wider border-b-4 border-black pb-4'>Community Creations</h2>

      <div className='bg-white h-full w-full rounded-none border-4 border-black shadow-[8px_8px_0_0_#000000] overflow-y-scroll flex flex-wrap p-4'>
        {creation.map((item, index) => (
          <div
            key={index}
            className='relative group p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'
          >
            <div className='relative w-full h-full rounded-none overflow-hidden border-4 border-black shadow-[4px_4px_0_0_#000000] group-hover:shadow-[6px_6px_0_0_#000000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200'>
              <img
                src={item.content}
                alt={item.prompt || "Generated content"}
                className='w-full h-full aspect-square object-cover'
              />

              <div
                className={`absolute bottom-0 top-0 right-0 left-0 flex flex-col justify-end p-4 
                             bg-black/90 text-white 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
              >
                <p className='text-sm font-mono font-bold mb-3 line-clamp-2 uppercase tracking-wide'>{item.prompt}</p>

                <div className='flex justify-end items-center'>
                  <div className='flex gap-2 items-center border-2 border-white px-3 py-1'>
                    <p className='text-sm font-mono font-black text-white'>{item.like?.length || 0}</p>

                    <Heart
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition-transform duration-200 
                                  ${item.like?.includes(user?.id)
                          ? "fill-blue-600 text-blue-600"
                          : 'text-white'
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