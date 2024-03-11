const router = require('express').Router()
const ctrls = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, isAdmin, ctrls.createBlogCategory)
router.get('/', ctrls.getBlogCategories)
router.put('/:bcid', verifyAccessToken, isAdmin, ctrls.updateBlogCategory)
router.delete('/:bcid', verifyAccessToken, isAdmin, ctrls.deleteBlogCategory)
router.get('/:bcid', ctrls.getBlogCategory)
module.exports = router
