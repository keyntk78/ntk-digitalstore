import React from 'react'
import { Link } from 'react-router-dom'
import path from '../../../utils/path'

const TopHeader = () => {
  return (
    <div className='w-full h-[38px] bg-main flex items-center justify-center text-white'>
      <div className='w-main flex justify-between '>
        <span className='text-[12px] pr-2 border-r'>
          ĐẶT HÀNG HOẶC GỌI CHO CHÚNG TÔI (+84) 000 8808
        </span>
        <Link
          to={`${path.LOGIN}`}
          className='text-[12px] pr-2 hover:text-black'
        >
          Đăng nhập hoặc đăng ký
        </Link>
      </div>
    </div>
  )
}

export default TopHeader
