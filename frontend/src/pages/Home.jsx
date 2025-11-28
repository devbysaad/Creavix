import React from 'react'
import Navbar from '../components/Navbar'
import Aitools from '../components/Aitools'
import UserTestmionial from '../components/UserTestmionial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="space-y-0">
        <Hero />
        <Aitools />
        <UserTestmionial />
        <Plan />
      </main>
      <Footer />
    </div>
  )
}

export default Home
