const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../middlewares/jwt')
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
      sucess: false,
      mes: 'Missing inputs',
    })
  const user = await User.findOne({ email })
  if (user) throw new Error('User has existed')
  else {
    const newUser = await User.create(req.body)
    return res.status(200).json({
      sucess: newUser ? true : false,
      messsage: newUser
        ? 'Register is successfully. Please go login~'
        : 'Something went wrong',
    })
  }
})

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, quân quyên người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      mes: 'Missing inputs',
    })
  // plain object
  const response = await User.findOne({ email })
  if (response && (await response.isCorrectPassword(password))) {
    // Tách password và role ra khỏi response
    const { password, role, ...userData } = response.toObject()
    // Tạo access token
    const accessToken = generateAccessToken(response._id, role)
    // Tạo refresh token
    const refreshToken = generateRefreshToken(response._id)
    // Lưu refresh token vào database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true })
    // Lưu refresh token vào cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(200).json({
      sucess: true,
      accessToken,
      userData,
    })
  } else {
    throw new Error('Invalid credentials!')
  }
})

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).select('-refreshToken -password -role')
  return res.status(200).json({
    success: false,
    rs: user ? user : 'User not found',
  })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error('No refresh token in cookies')
  // Check token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  })
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : 'Refresh token not matched',
  })
})

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken)
    throw new Error('No refresh token in cookies')
  // Xóa refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: '' },
    { new: true }
  )
  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  })
  return res.status(200).json({
    success: true,
    mes: 'Logout is done',
  })
})

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
}
