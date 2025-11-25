import React from 'react'
import userGroup from "../assets/user_group.png";
import Aitools from './Aitools';
import Plan from './Plan';

const Hero = () => {
    return (
        <div className="px-4 sm:px-10 md:px-16 lg:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url('/src/assets/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen">
            
            {/* text portion */}
            <div className='flex flex-col justify-center text-center mt-32 sm:mt-40 md:mt-48 lg:mt-52'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight'>
                    Craft stunning content using <br />
                    powerful <span className='text-primary'>AI tools</span>
                </h1>

                <p className='text-shadow-white py-6 sm:py-8 md:py-10 text-base sm:text-lg md:text-xl'>
                    Upgrade the way you create. Write articles, produce images, and optimize your
                    <br />
                    workflow with our AI-powered tools.
                </p>
            </div>

            {/* button here */}
            <div className='flex flex-col sm:flex-row justify-center items-center text-center gap-4 sm:gap-5 mt-6'>
                <button className='py-3 sm:py-4 px-8 sm:px-10 rounded-3xl sm:rounded-4xl cursor-pointer active:scale-95 transition-all hover:scale-102 shadow-2xl text-white bg-primary font-thin'>
                    start creating now
                </button>
                <button className='py-3 sm:py-4 px-8 sm:px-10 rounded-3xl sm:rounded-4xl shadow-2xl cursor-pointer active:scale-95 transition-all hover:scale-102 text-black bg-white font-thin'>
                    watch demo
                </button>
            </div>

            {/* testimonial here */}
            <div className='flex flex-col sm:flex-row justify-center items-center text-center gap-3 sm:gap-5 text-thin py-5 sm:py-7 mt-6'>
                <img className='w-24 sm:w-30' src={userGroup} alt="userGroup" />
                <h2 className='text-base sm:text-lg md:text-xl'>Trusted by 100K+ peoples</h2>
            </div>

            {/* tools section */}
            <div className='pt-7'>
                {/* You can place <Aitools /> or other components here */}
            </div>
        </div>
    )
}

export default Hero
