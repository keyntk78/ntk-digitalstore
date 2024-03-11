const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

//CREATE
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body

  if (!title || !description || !category) {
    throw new Error('Missing inputs')
  }
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const newBlog = await Blog.create(req.body)
  return res.status(200).json({
    success: newBlog ? true : false,
    metadata: newBlog ? newBlog : 'Canot create new blog',
  })
})

//GETBYID
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const blog = await Blog.findById(bid)
  return res.status(200).json({
    success: blog ? true : false,
    metadata: blog ? blogCate : 'Cannot get blog',
  })
})

//GETBYALL
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
  return res.status(200).json({
    success: blogs ? true : false,
    metadata: blogs ? blogs : 'Cannot get blog',
  })
})

//UPDATE
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title)
  }

  const updatedBlog = await Blog.findByIdAndUpdate(bid, req.body, {
    new: true,
  })
  return res.status(200).json({
    success: updatedBlog ? true : false,
    metadata: updatedBlog ? updatedBlog : 'Canot update blog',
  })
})

//DELETE
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const deletedBlog = await Blog.findByIdAndDelete(bid)
  return res.status(200).json({
    success: deletedBlog ? true : false,
    metadata: deletedBlog ? deletedBlog : 'Canot delete blog',
  })
})

// //Like
// const likeBlog = asyncHandler(async (req, res) => {
//   const { _id } = req.user
//   const { bid } = req.params
//   if (!bid) throw new Error('Missing input')
//   const blog = await Blog.findByIdAndDelete(bid)
//   const areadyDislikes = await blog?.dislikes?.find(
//     (uid) => uid.toString() === _id
//   )
//   if (areadyDislikes) {
//     const response = await Blog.findByIdAndUpdate(
//       bid,
//       {
//         $pull: { dislikes: _id, isDislikes: false },
//       },
//       { new: true }
//     )
//     return res.status(200).json({
//       success: response ? true : false,
//       metadata: response,
//     })
//   }
// })
//Dislike

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  getBlogs,
  //   likeBlog,
}
