import React from 'react'
import { SectionHeader, SliderProduct } from '../index'
import { useSelector } from 'react-redux'

const SectionNewArrival = () => {
  const { newProducts } = useSelector((state) => state.products)

  return (
    <div className='w-full mb-6'>
      <SectionHeader title={'Sản phẩm mới nhất'} isTab={false} />
      <div className='mt-4 mx-[-10px]'>
        <SliderProduct items={newProducts} slidesToShow={4} />
      </div>
    </div>
  )
}

export default SectionNewArrival
