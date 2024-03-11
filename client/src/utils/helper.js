import icons from './icons'
export const fortmatMoney = (number) =>
  Number(number?.toFixed(1)).toLocaleString().replace(/,/g, '.')

const { AiFillStar, AiOutlineStar } = icons

export const renderStarFromNumber = (number, size, color) => {
  const star = []
  for (let i = 0; i < +number; i++) {
    star.push(
      <AiFillStar key={i} color={color || 'orange'} size={size || 16} />
    )
  }
  for (let i = 5; i > +number; i--) {
    star.push(
      <AiOutlineStar key={i} color={color || 'orange'} size={size || 16} />
    )
  }

  return star
}

export function secondsToHms(d) {
  d = Number(d) / 1000
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)
  return { h, m, s }
}
