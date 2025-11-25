import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import UserTestmionial from '../components/UserTestmionial'
import Plan from '../components/Plan'
import Aitools from '../components/Aitools'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Aitools/>
      <UserTestmionial/>
      <Plan/>
      <Footer/>
    </>
  )

}

export default Home