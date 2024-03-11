const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

//CREATE
const createProductCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing inputs')
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const newPC = await ProductCategory.create(req.body)
  return res.status(200).json({
    success: newPC ? true : false,
    metadata: newPC ? newPC : 'Canot create new product category',
  })
})

//GETBYID
const getProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params
  const productCate = await ProductCategory.findById(pcid)
  return res.status(200).json({
    success: productCate ? true : false,
    metadata: productCate ? productCate : 'Cannot get product category',
  })
})

//Filtering sorting & pagination
const getProductCategories = asyncHandler(async (req, res) => {
  const queies = { ...req.query }
  console.log(queies)
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

  let queryCommand = ProductCategory.find(fortmatedQueries)

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
  const counts = await ProductCategory.find(fortmatedQueries).countDocuments()
  return res.status(200).json({
    success: results ? true : false,
    metadata: results ? results : 'Cannot get product',
    counts,
  })
})

// //GETBYALL
// const getProductCategories = asyncHandler(async (req, res) => {
//   const productCate = await ProductCategory.find()
//   return res.status(200).json({
//     success: productCate ? true : false,
//     metadata: productCate ? productCate : 'Cannot get product category',
//   })
// })

//UPDATE
const updateProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const updatedProductCate = await ProductCategory.findByIdAndUpdate(
    pcid,
    req.body,
    {
      new: true,
    }
  )
  return res.status(200).json({
    success: updatedProductCate ? true : false,
    metadata: updatedProductCate
      ? updatedProductCate
      : 'Canot update product category',
  })
})

//DELETE
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params
  const deletedProductCate = await ProductCategory.findByIdAndDelete(pcid)
  return res.status(200).json({
    success: deletedProductCate ? true : false,
    metadata: deletedProductCate ? deletedProductCate : 'Canot delete product',
  })
})

module.exports = {
  createProductCategory,
  getProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
}
