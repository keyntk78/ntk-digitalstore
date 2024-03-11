import React from 'react'
import { fortmatMoney, renderStarFromNumber } from '../../utils/helper'

const ProductCardInfo = ({
  title,
  totalRating,
  price,
  clsArea,
  clsTitle,
  sizeIcon,
  colorIcon,
  clsTotalRating,
  clsPrice,
  unit,
}) => {
  return (
    <div className={`flex-col flex mt-[15px] w-full ${clsArea}`}>
      <span className={`line-clamp-1 ${clsTitle}`}>{title}</span>
      <span className={`flex h-4 ${clsTotalRating}`}>
        {renderStarFromNumber(totalRating, sizeIcon, colorIcon)}
      </span>
      <span className={`${clsPrice}`}>{`${fortmatMoney(price)} ${
        unit || 'VNĐ'
      }`}</span>
    </div>
  )
}

export default ProductCardInfo
