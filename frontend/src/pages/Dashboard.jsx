// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Sparkle, Sparkles } from 'lucide-react';
import { Protect, useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Dashboard = () => {
    const [creations, setCreations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = useAuth();
    const { user } = useUser();

    const getDashboardData = async () => {
        try {
            setIsLoading(true);
            const token = await getToken();
            const { data } = await api.get('/api/user/user-creations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (data.success) {
                setCreations(data.creations);
            } else {
                toast.error('Failed to load creations');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to load your creations');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            getDashboardData();
        }
    }, [user]);

    return (
        <div className='h-full flex flex-col overflow-auto scrollbar-hide p-6 sm:p-8 bg-white'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="flex flex-col bg-white rounded-none border-4 border-black p-8 shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <p className='text-sm font-mono font-black text-black mb-2 uppercase tracking-widest'>Total Creations</p>
                            <h2 className="text-4xl font-mono font-black text-blue-600">
                                {isLoading ? '...' : creations.length}
                            </h2>
                        </div>
                        <div className="w-16 h-16 rounded-none bg-black border-4 border-black text-white flex justify-center items-center">
                            <Sparkle className='w-8 h-8' />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white rounded-none border-4 border-black p-8 shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <p className='text-sm font-mono font-black text-black mb-2 uppercase tracking-widest'>Active Plan</p>
                            <h2 className="text-4xl font-mono font-black">
                                <Protect plan='premium' fallback={<span className='text-black'>Free</span>}>
                                    <span className='text-blue-600'>Premium</span>
                                </Protect>
                            </h2>
                        </div>
                        <div className="w-16 h-16 rounded-none bg-blue-600 border-4 border-blue-600 text-white flex justify-center items-center">
                            <Sparkles className='w-8 h-8' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <h1 className='text-3xl font-mono font-black text-black mb-8 uppercase tracking-wider border-b-4 border-black pb-4'>Recent Creations</h1>
                
                {isLoading ? (
                    <div className="text-center py-20 border-4 border-dashed border-black rounded-none bg-white">
                        <p className="font-mono font-black text-black uppercase tracking-wider">Loading your creations...</p>
                    </div>
                ) : creations.length === 0 ? (
                    <div className="text-center py-20 border-4 border-dashed border-black rounded-none bg-white">
                        <p className="font-mono font-black text-black uppercase tracking-wider">No creations yet. Start creating!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {creations.slice(0, 6).map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border-4 border-black rounded-none p-6 shadow-[4px_4px_0_0_#000000] hover:shadow-[8px_8px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                            >
                                <div className="mb-4">
                                    <span className="text-xs font-mono font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 border-2 border-black">
                                        {item.type}
                                    </span>
                                </div>
                                <p className="text-sm font-mono font-bold text-black uppercase tracking-wide line-clamp-2">
                                    {item.prompt}
                                </p>
                                <p className="text-xs font-mono text-black/60 mt-3 uppercase">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;