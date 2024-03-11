import React, { useEffect } from 'react'
import {
  Banner,
  Sidebar,
  SectionBestSeller,
  SectionDealDaily,
  SectionFeaturedProduct,
  SectionNewArrival,
  SectionHotCollection,
} from '../../components/public'
import { getNewProducts } from '../../store/products/productAction'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNewProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      {/* Wrapper */}
      <div className='w-main flex mb-6'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
          <Sidebar />
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
          <Banner />
        </div>
      </div>
      <div className='w-main flex mb-6'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto'>
          <SectionDealDaily />
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
          <SectionBestSeller />
        </div>
      </div>
      {/* Content */}
      <div>
        <SectionFeaturedProduct />
        <SectionNewArrival />
        <SectionHotCollection />
      </div>
    </div>
  )
}

export default Home
