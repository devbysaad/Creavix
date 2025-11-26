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

    // --- Theme Classes ---
    // Card/Container style: bg-gray-700
    const cardClasses = 'flex flex-col w-72 bg-gray-700 rounded-xl border border-gray-600 p-0 shadow-lg';
    // Accent Icon Container: Primary Indigo gradient (UNCHANGED)
    const iconContainerClasses = 'w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex justify-center items-center';
    // Text Colors
    const primaryText = 'text-white';
    // ---

    return (
        // Main Container: Black background, full height scrollable
        <div className='h-full overflow-y-scroll p-6 bg-black'>
            <div className="flex flex-row gap-6">

                {/* Total Creation Card */}
                <div className={cardClasses}>
                    <div className='flex flex-row items-center w-full px-6 py-4 justify-between'>
                        <div className='text-gray-300'> 
                            <p className='text-sm'>Total Creation</p>
                            <h2 className={`text-xl font-semibold ${primaryText}`}>{creation.length}</h2>
                        </div>
                        <div className={iconContainerClasses}>
                            <Sparkle className='w-5 text-white' />
                        </div>
                    </div>
                </div>

                {/* Active Plan Card */}
                <div className={cardClasses}>
                    <div className='flex flex-row items-center w-full px-6 py-4 justify-between'>
                        <div className='text-gray-300'>
                            <p className='text-sm'>Active Plan</p>
                            <h2 className={`text-xl font-semibold ${primaryText}`}>
                                <Protect plan='premium' fallback={<span className='text-gray-300'>Free</span>}>
                                    <span className='text-indigo-400'>Premium</span>
                                </Protect>
                            </h2>
                        </div>
                        <div className={iconContainerClasses}>
                            <Sparkles className='w-5 text-white' />
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex mt-10 flex-col'>
                <h1 className='text-3xl font-semibold text-white'>Recent Creations</h1>
                <div className='flex flex-wrap gap-6 mt-4'>
                    {creation.map((item) => <CreationItem key={item.id} item={item} />)}
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Dashboard;