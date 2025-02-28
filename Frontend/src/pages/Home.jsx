import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='bg-[url(/bg_img.png)] bg-cover bg-center h-screen w-full px-3 md:px-12 '>
      <Navbar />
      <Header></Header>
    </div>
  )
}

export default Home