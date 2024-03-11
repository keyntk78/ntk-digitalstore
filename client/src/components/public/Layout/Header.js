import React from 'react'
import logo from '../../../assets/logodefault.png'
import icons from '../../../utils/icons'
import { Link } from 'react-router-dom'
import path from '../../../utils/path'
import { SupportCard } from '../index'
const Header = () => {
  const { FaPhoneAlt, MdEmail, FaCircleUser, FaBagShopping } = icons

  return (
    <header className='w-main flex justify-between items-center h-[110px] py-[35px]'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt='logo' className='h-[110px] object-contain' />
      </Link>
      <div className='flex text-[13px] uppercase'>
        <SupportCard
          icon={<FaPhoneAlt color='#0a68ff' />}
          title={'(+84) 000 8808'}
          subtitle={'Thứ 2-7 9:00 - 20:00'}
        />
        <SupportCard
          icon={<MdEmail color='#0a68ff' />}
          title={'SUPPORT@NTK.COM'}
          subtitle={'Hổ trợ online 24/7'}
        />
        <div className='flex gap-2 items-center justify-center px-6 border-r'>
          <FaBagShopping color='#0a68ff' size={24} />
          <span>Giỏ hàng (0)</span>
        </div>
        <div className='flex justify-center items-center px-6'>
          <FaCircleUser size={24} />
        </div>
      </div>
    </header>
  )
}

export default Header
