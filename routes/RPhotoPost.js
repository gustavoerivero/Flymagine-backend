const router = require('express').Router()
const cPhotoPost = require('../controllers/CPhotoPost')

router.post('/', cPhotoPost.createPhotoPost)
router.get('/:id', cPhotoPost.getPhotoPost)
router.get('/', cPhotoPost.getAllPhotoPosts)
router.get('/post/:id', cPhotoPost.getPhotoPostbyPost)
router.put('/:id', cPhotoPost.updatePhotoPost)
router.delete('/:id', cPhotoPost.deletePhotoPost)

module.exports = router