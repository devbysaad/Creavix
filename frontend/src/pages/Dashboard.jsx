import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { dummyCreationData } from '../assets/assets'
import { Sparkle, Sparkles } from 'lucide-react'
import { Protect } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'

const Dashboard = () => {
    const [creation, setCreation] = useState([])

    const getDashboardData = async () => {
        setCreation(dummyCreationData)
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return (
        // Main Container
        <div className='h-full overflow-y-scroll p-6 sm:p-8 bg-white'>
            <div className="flex flex-col gap-8 mb-10 max-w-2xl">

                {/* Total Creation Card */}
                <div className="flex flex-col bg-white rounded-none border-4 border-black p-8 shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <p className='text-sm font-mono font-black text-black mb-2 uppercase tracking-widest'>Total Creations</p>
                            <h2 className="text-4xl font-mono font-black text-blue-600">{creation.length}</h2>
                        </div>
                        <div className="w-16 h-16 rounded-none bg-black border-4 border-black text-white flex justify-center items-center">
                            <Sparkle className='w-8 h-8' />
                        </div>
                    </div>
                </div>

                {/* Active Plan Card */}
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

            <div className='flex flex-col'>
                <h1 className='text-3xl font-mono font-black text-black mb-8 uppercase tracking-wider border-b-4 border-black pb-4'>Recent Creations</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
                    {creation.map((item) => <CreationItem key={item.id} item={item} />)}
                </div>
                {creation.length === 0 && (
                    <div className="text-center py-20 border-4 border-dashed border-black rounded-none bg-white">
                        <p className="font-mono font-black text-black uppercase tracking-wider">No creations yet. Start creating!</p>
                    </div>
                )}
            </div>

            <Outlet />
        </div>
    )
}

export default Dashboard;