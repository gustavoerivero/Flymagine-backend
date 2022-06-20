const router = require('express').Router()
const cCommentPost = require('../controllers/CCommentPost')
const { imageUpload } = require('../utils/multer')

router.post('/', cCommentPost.createCommentPost)
router.get('/', cCommentPost.getAllCommentPost)
router.get('/:id', cCommentPost.getCommentPostById)
router.get('/post/:id', cCommentPost.getCommentPostByPost)
router.get('/user/:id', cCommentPost.getCommentPostByUser)
router.post('/:id/image', imageUpload.single('photo'), cCommentPost.uploadImage)
router.put('/:id', cCommentPost.updateCommentPost)
router.delete('/:id', cCommentPost.deleteCommentPost)

module.exports = router