const Product = require('../models/product')
const ProductCategory = require('../models/productCategory')

const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const data = require('../../data/data.json')
const data2 = require('../../data/data_cate_brand')

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name),
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    thumb: product?.thumb,
    images: product?.images,
    color: product?.variants?.find((el) => el.label === 'Color')?.variants[0],
    totalRating: Math.round(Math.random() * 5),
  })
}

const insertProduct = asyncHandler(async (req, res) => {
  const promises = []
  for (let product of data) promises.push(fn(product))
  await Promise.all(promises)
  return res.status(200).json('Done')
})

const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    slug: slugify(cate?.cate),
    position: cate?.position,
    thumb: cate?.thumb,
    brand: cate?.brand,
  })
}

const insertProductCategory = asyncHandler(async (req, res) => {
  const promises = []
  console.log(data2)
  for (let cate of data2) promises.push(fn2(cate))
  await Promise.all(promises)
  return res.status(200).json('Done')
})

module.exports = {
  insertProduct,
  insertProductCategory,
}
