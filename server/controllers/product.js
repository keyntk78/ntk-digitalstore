const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

//CREATE
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing inputs')
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const newProduct = await Product.create(req.body)
  return res.status(200).json({
    success: newProduct ? true : false,
    metadata: newProduct ? newProduct : 'Canot create new product',
  })
})

//GETBYID
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const product = await Product.findById(pid)
  return res.status(200).json({
    success: product ? true : false,
    metadata: product ? product : 'Cannot get product',
  })
})

//Filtering sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
  const queies = { ...req.query }
  //tách các trường đặt biệt ra khỏi query
  const excludeFields = ['limit', 'sort', 'page', 'fields']
  excludeFields.forEach((field) => delete queies[field])

  // //Format lại các operator cho đúng cú pháp moongo
  let queryString = JSON.stringify(queies)
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matches) => `$${matches}`
  )

  const fortmatedQueries = JSON.parse(queryString)

  //Filtering
  if (queies?.title)
    fortmatedQueries.title = { $regex: queies.title, $options: 'i' }

  let queryCommand = Product.find(fortmatedQueries)

  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    queryCommand = queryCommand.sort(sortBy)
  }

  //Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ')
    queryCommand = queryCommand.select(fields)
  }
  //pagination
  const page = req.query.page || 1
  const limit = req.query.limit || process.env.LIMIT_PAGINATION
  const skip = (page - 1) * limit
  queryCommand = queryCommand.skip(skip).limit(limit)

  var results = await queryCommand.exec()
  const counts = await Product.find(fortmatedQueries).countDocuments()
  return res.status(200).json({
    success: results ? true : false,
    metadata: results ? results : 'Cannot get product',
    counts,
  })
})

//UPDATE
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  })
  return res.status(200).json({
    success: updatedProduct ? true : false,
    metadata: updatedProduct ? updatedProduct : 'Canot update product',
  })
})

//DELETE
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params

  const deletedProduct = await Product.findByIdAndDelete(pid)
  return res.status(200).json({
    success: deletedProduct ? true : false,
    metadata: deletedProduct ? deletedProduct : 'Canot delete product',
  })
})

//ratings
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { star, comment, pid } = req.body
  if (!star || !pid) throw new Error('Missing inputs')
  const ratingProduct = await Product.findById(pid)
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.posteBy.toString() === _id
  )
  if (alreadyRating) {
    //update rating
    await Product.updateOne(
      { ratings: { $elemMatch: alreadyRating } },
      { $set: { 'ratings.$.star': star, 'ratings.$.comment': comment } },
      { new: true }
    )
  } else {
    //add rating
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, posteBy: _id } },
      },
      { new: true }
    )
  }

  //sum ratings
  const updatedProduct = await Product.findById(pid)
  const ratingCount = updatedProduct.ratings.length

  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  )

  updatedProduct.totalRating = Math.round((sumRatings * 10) / ratingCount) / 10

  await updatedProduct.save()

  return res.status(200).json({
    success: true,
  })
})

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
}
