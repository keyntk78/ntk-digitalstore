const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/', verifyAccessToken, isAdmin, ctrls.createBlog)
router.get('/', ctrls.getBlogs)
router.put('/:bid', verifyAccessToken, isAdmin, ctrls.updateBlog)
router.delete('/:bid', verifyAccessToken, isAdmin, ctrls.deleteBlog)
router.get('/:bid', ctrls.getBlog)
module.exports = router
