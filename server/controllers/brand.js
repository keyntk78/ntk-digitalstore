const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

//CREATE
const createBrand = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing inputs')
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const newBrand = await Brand.create(req.body)
  return res.status(200).json({
    success: newBrand ? true : false,
    metadata: newBrand ? newBrand : 'Canot create new brand',
  })
})

//GETBYID
const getBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const brand = await Brand.findById(bid)
  return res.status(200).json({
    success: brand ? true : false,
    metadata: brand ? brand : 'Cannot get brand',
  })
})

//GETBYALL
const getBrands = asyncHandler(async (req, res) => {
  const brand = await Brand.find()
  return res.status(200).json({
    success: brand ? true : false,
    metadata: brand ? brand : 'Cannot get brand',
  })
})

//UPDATE
const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const updatedbrand = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  })
  return res.status(200).json({
    success: updatedbrand ? true : false,
    metadata: updatedbrand ? updatedbrand : 'Canot update brand',
  })
})

//DELETE
const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const deletedbrand = await Brand.findByIdAndDelete(bid)
  return res.status(200).json({
    success: deletedbrand ? true : false,
    metadata: deletedbrand ? deletedbrand : 'Canot delete brand',
  })
})

module.exports = {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
  deleteBrand,
}
