import React, { useEffect, useState } from 'react'
import { tabSellerHome } from '../../../utils/contants'
import { apiGetProducts } from '../../../apis/product'
import { SliderProduct } from '../index'
import { useSelector } from 'react-redux'
import { SectionHeader } from '../index'

const SectionBestSeller = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [bestSellers, setBestSellers] = useState(null)
  const { newProducts } = useSelector((state) => state.products)
  const [products, setProducts] = useState(null)

  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: '-sold' }),
      apiGetProducts({ sort: '-createdAt' }),
    ])
    if (response[0].data.success) {
      setBestSellers(response[0].data.metadata)
      setProducts(response[0].data.metadata)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (activeTab === 1) setProducts(bestSellers)
    if (activeTab === 2) setProducts(newProducts)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  return (
    <div>
      <SectionHeader
        isTab={true}
        arrTitle={tabSellerHome}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className='mt-4 mx-[-10px]'>
        <SliderProduct items={products} />
      </div>
      <div className='w-full flex gap-4 mt-4'>
        <img
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'
          alt=''
          className='flex-1 object-contain'
        />
        <img
          src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
          alt=''
          className='flex-1 object-contain'
        />
      </div>
    </div>
  )
}

export default SectionBestSeller
