const router = require('express').Router()
const cPost = require('../controllers/CPost')
const { imageUpload } = require('../utils/multer')

router.post('/', cPost.createPost)
router.get('/', cPost.getAllPosts)
router.get('/:id', cPost.getPostById)
router.get('/user/:id', cPost.getPostByUser)
router.post('/feed', cPost.getFeedPosts)
router.post('/:id/image', imageUpload.single('photo'), cPost.uploadImage)
router.put('/:id', cPost.updatePost)
router.delete('/:id', cPost.deletePost)

// Reaction to post actions
router.post('/:id/reaction', cPost.setReactionPost)
router.get('/:id/reaction', cPost.getReactionPost)

// User tag actions routes
router.post('/:id/usertag', cPost.setUserTag)
router.get('/:id/usertag', cPost.getUserTagByPost)

// Hashtag tag actions routes
router.post('/:id/hashtag', cPost.setHashtagTag)
router.get('/:id/hashtag', cPost.getHashtagTagByPost)

module.exports = router