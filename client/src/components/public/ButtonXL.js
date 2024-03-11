import React from 'react'

const ButtonXL = ({ icon, title }) => {
  return (
    <button
      type='button'
      className='flex mt-4 text-[14px] uppercase font-normal justify-center items-center gap-2 px-[15px] py-[11px] w-full bg-main text-white hover:bg-gray-800'
    >
      {icon}
      <span>{title}</span>
    </button>
  )
}

export default ButtonXL
