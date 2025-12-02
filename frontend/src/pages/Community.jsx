// src/pages/Community.jsx
import React, { useLayoutEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/api/user/public-creations');
      
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error('Failed to load creations');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load community creations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (creationId) => {
    try {
      const token = await getToken();
      const { data } = await api.post('/api/user/toggle-like', 
        { id: creationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setCreations(prevCreations => 
          prevCreations.map(item => 
            item.id === creationId 
              ? { ...item, likes: data.creation.likes }
              : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Like error:', error);
      toast.error('Failed to update like');
    }
  };

  useLayoutEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className='flex-1 min-h-screen flex flex-col gap-6 p-8 bg-white'>
      <h2 className='text-3xl font-mono font-black text-black uppercase tracking-wider border-b-4 border-black pb-4'>Community Creations</h2>

      <div className='bg-white h-full w-full rounded-none border-4 border-black shadow-[8px_8px_0_0_#000000] overflow-y-scroll flex flex-wrap p-4'>
        {isLoading ? (
          <div className='w-full flex items-center justify-center py-20'>
            <p className='text-xl font-mono font-bold text-black uppercase tracking-wider'>Loading creations...</p>
          </div>
        ) : creations.length === 0 ? (
          <div className='w-full flex items-center justify-center py-20'>
            <p className='text-xl font-mono font-bold text-black uppercase tracking-wider'>No public creations yet</p>
          </div>
        ) : (
          creations.map((item, index) => (
            <div
              key={item.id || index}
              className='relative group p-3 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'
            >
              <div className='relative w-full h-full rounded-none overflow-hidden border-4 border-black shadow-[4px_4px_0_0_#000000] group-hover:shadow-[6px_6px_0_0_#000000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-200'>
                <img
                  src={item.content}
                  alt={item.prompt || "Generated content"}
                  className='w-full h-full aspect-square object-cover'
                />

                <div
                  className='absolute bottom-0 top-0 right-0 left-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                >
                  <p className='text-sm font-mono font-bold mb-3 line-clamp-2 uppercase tracking-wide text-white'>{item.prompt}</p>

                  <div className='flex justify-end items-center'>
                    <div className='flex gap-2 items-center border-2 border-white px-3 py-1'>
                      <p className='text-sm font-mono font-black text-white'>
                        {Array.isArray(item.likes) ? item.likes.length : 0}
                      </p>

                      <Heart
                        onClick={() => handleLike(item.id)}
                        className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition-transform duration-200 
                          ${Array.isArray(item.likes) && item.likes.includes(user?.id)
                            ? "fill-blue-600 text-blue-600"
                            : 'text-white'
                          }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;