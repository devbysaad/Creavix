import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className="bg-black py-20">
            {/* Heading Section */}
            <div className='max-w-2xl mx-auto px-6 text-center'>
                <h1 className='text-3xl sm:text-4xl font-semibold text-white'>
                    Choose Your Plan
                </h1>
                <p className='font-thin text-sm sm:text-base mt-3 text-gray-400'>
                    Start for free and scale up as you grow. Find the perfect plan for your
                    <br className='hidden sm:block' />
                    content creation needs.
                </p>
            </div>

            {/* Pricing Section */}
            <div className="w-full flex justify-center py-16 sm:py-20">
                <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl shadow-lg border border-gray-800 bg-gray-900 p-6 sm:p-10">
                        <div className="text-gray-200">
                            <PricingTable
                                appearance={{
                                    elements: {
                                        card: "bg-gray-800 border border-gray-700 text-gray-200 rounded-xl shadow-md",
                                        planHeader: "text-white",
                                        planPrice: "text-indigo-500 font-semibold",
                                        planFeatures: "text-gray-300",
                                        ctaButton: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 shadow-md"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plan
