import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className="bg-white py-24 border-t-4 border-black">
            {/* Heading Section */}
            <div className='max-w-3xl mx-auto px-6 text-center mb-16'>
                <h2 className='text-base font-mono font-bold text-blue-600 tracking-widest uppercase mb-4 border-4 border-blue-600 inline-block px-6 py-2'>
                    Pricing
                </h2>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-mono font-black text-black mb-8 tracking-tight uppercase'>
                    Choose Your Plan
                </h1>
                <p className='text-lg font-mono text-black leading-relaxed uppercase tracking-wide'>
                    Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                </p>
            </div>

            {/* Pricing Section */}
            <div className="w-full flex justify-center">
                <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-none border-4 border-black bg-white p-8 sm:p-12 shadow-[12px_12px_0_0_#000000]">
                        <div className="relative z-10">
                            <PricingTable
                                appearance={{
                                    elements: {
                                        card: "bg-white border-4 border-black text-black rounded-none shadow-[8px_8px_0_0_#000000] hover:shadow-[12px_12px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 font-mono",
                                        planHeader: "text-black font-mono font-black text-2xl uppercase tracking-wider",
                                        planPrice: "text-blue-600 font-mono font-black text-4xl",
                                        planFeatures: "text-black font-mono",
                                        ctaButton: "bg-black hover:bg-blue-600 text-white rounded-none border-2 border-black px-8 py-4 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 font-mono font-bold uppercase tracking-widest w-full"
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
