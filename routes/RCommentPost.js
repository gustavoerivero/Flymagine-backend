const router = require('express').Router()
const cCommentPost = require('../controllers/CCommentPost')

router.post('/', cCommentPost.createCommentPost)
router.get('/', cCommentPost.getAllCommentPost)
router.get('/:id', cCommentPost.getCommentPostById)
router.get('/post/:id', cCommentPost.getCommentPostByPost)
router.get('/user/:id', cCommentPost.getCommentPostByUser)
router.put('/:id', cCommentPost.updateCommentPost)
router.delete('/:id', cCommentPost.deleteCommentPost)

module.exports = router