import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation, TopHeader, Footer } from '../../components/public'

const Public = () => (
  <>
    <div className='w-full flex flex-col justify-center items-center'>
      <TopHeader />
      <Header />
      <Navigation />
      <main className='w-main'>
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
)

export default Public
