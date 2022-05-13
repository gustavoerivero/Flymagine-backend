const router = require('express').Router()
const cPost = require('../controllers/CPost')

router.post('/', cPost.createPost)
router.get('/', cPost.getAllPosts)
router.get('/:id', cPost.getPostById)
router.get('/user/:id', cPost.getPostByUser)
router.put('/:id', cPost.updatePost)
router.delete('/:id', cPost.deletePost)

// User reaction post actions routes
router.post('/:id/reaction', cPost.setReactionPost)

// Reaction post actions routes
router.get('/:id/reaction', cPost.getReactionPostUsersByPost)

// User tag actions routes
router.post('/:id/tag-user', cPost.setUserTag)

// Hashtag tag actions routes
router.post('/:id/tag-hashtag', cPost.setHashtagTag)

module.exports = router