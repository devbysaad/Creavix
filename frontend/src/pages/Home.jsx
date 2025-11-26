import React from 'react'
import Navbar from '../components/Navbar'
import Aitools from '../components/Aitools'
import UserTestmionial from '../components/UserTestmionial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="bg-black text-gray-200 min-h-screen">
      <Navbar />
      <Hero />
      <hr className="border-gray-800 my-16" />
      <Aitools />
      <hr className="border-gray-800 my-16" />
      <UserTestmionial />
      <hr className="border-gray-800 my-16" />
      <Plan />
      <hr className="border-gray-800 my-16" />
      <Footer />
    </div>
  )
}

export default Home
