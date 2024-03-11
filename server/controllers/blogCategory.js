const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

//CREATE
const createBlogCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing inputs')
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const newBC = await BlogCategory.create(req.body)
  return res.status(200).json({
    success: newBC ? true : false,
    metadata: newBC ? newBC : 'Canot create new blog category',
  })
})

//GETBYID
const getBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params
  const blogCate = await BlogCategory.findById(bcid)
  return res.status(200).json({
    success: blogCate ? true : false,
    metadata: blogCate ? blogCate : 'Cannot get blog category',
  })
})

//GETBYALL
const getBlogCategories = asyncHandler(async (req, res) => {
  const blogCate = await BlogCategory.find()
  return res.status(200).json({
    success: blogCate ? true : false,
    metadata: blogCate ? blogCate : 'Cannot get blog category',
  })
})

//UPDATE
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const updatedBlogCate = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  })
  return res.status(200).json({
    success: updatedBlogCate ? true : false,
    metadata: updatedBlogCate ? updatedBlogCate : 'Canot update blog category',
  })
})

//DELETE
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params
  const deletedBlogCate = await BlogCategory.findByIdAndDelete(bcid)
  return res.status(200).json({
    success: deletedBlogCate ? true : false,
    metadata: deletedBlogCate ? deletedBlogCate : 'Canot delete blog category',
  })
})

module.exports = {
  createBlogCategory,
  getBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory,
}
