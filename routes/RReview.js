const router = require('express').Router()
const cReview = require('../controllers/CReview')

router.post('/', cReview.createReview)
router.get('/', cReview.getAllReviews)
router.get('/:id', cReview.getReviewById)
router.get('/book/:id', cReview.getReviewByBook)
router.get('/user/:id', cReview.getReviewByUser)
router.put('/:id', cReview.updateReview)
router.delete('/:id', cReview.deleteReview)

module.exports = router