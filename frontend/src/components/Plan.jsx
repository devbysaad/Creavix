import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <>
            {/* Heading Section */}
            <div className='max-w-2xl mx-auto mt-20 px-6 text-center'>
                <h1 className='text-3xl sm:text-4xl font-semibold text-black'>
                    Choose Your Plan
                </h1>
                <p className='font-thin text-sm sm:text-base mt-3 text-gray-600'>
                    Start for free and scale up as you grow. Find the perfect plan for your
                    <br className='hidden sm:block' />
                    content creation needs.
                </p>
            </div>

            {/* Pricing Section */}
            <div className="w-full flex justify-center py-16 sm:py-20 bg-gray-50 mt-10">
                <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl shadow-xl border border-gray-200 bg-white p-4 sm:p-8">
                        <PricingTable />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plan
