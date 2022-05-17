'use strict'

const router = require('express').Router()

router.use('/role', require('./RRole'))
router.use('/user', require('./RUser'))
router.use('/notification', require('./RNotification'))
router.use('/book', require('./RBook'))
router.use('/literary-genre', require('./RLiteraryGenre'))
router.use('/review', require('./RReview'))
router.use('/comment-review', require('./RCommentReview'))
router.use('/post', require('./RPost'))
router.use('/comment-post', require('./RCommentPost'))
router.use('/hashtag', require('./RHashtag'))

module.exports = router