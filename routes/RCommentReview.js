const router = require('express').Router()
const cCommentReview = require('../controllers/CCommentReview')

router.post('/', cCommentReview.createCommentReview)
router.get('/:id', cCommentReview.getCommentReview)
router.get('/', cCommentReview.getCommentReviews)
router.get('/review/:id', cCommentReview.getCommentReviewsByReview)
router.get('/user/:id', cCommentReview.getCommentReviewsByUser)
router.put('/:id', cCommentReview.updateCommentReview)
router.delete('/:id', cCommentReview.deleteCommentReview)

module.exports = router