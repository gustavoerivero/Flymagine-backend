const mReview = require('../models/MReview')
const resp = require('../utils/responses')

// ReactionReview imports
const mReactionReview = require('../models/MReactionReview')

const createReview = async (req, res) => {
  try {
    const value = req.body

    const review = new mReview({
      user: value.user,
      book: value.book,
      description: value.description,
      rating: value.rating,
    })

    const saveReview = await review.save()
    const reviewPopulate = await mReview.findOne({ _id: saveReview._id })
      .populate({ path: 'user' })
      .populate({ path: 'book' })

    resp.makeResponsesOkData(res, reviewPopulate, "RVCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllReviews = async (req, res) => {
  try {

    const reviews = await mReview.find({ status: 'A' })
      .sort({ createdAt: -1 })
      .populate({ path: 'user' })
      .populate({ path: 'book' })

    resp.makeResponsesOkData(res, reviews, "RVGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewById = async (req, res) => {
  try {

    const review = await mReview.findOne({ _id: req.params.id, status: 'A' })
    .populate({ path: 'user' })
    .populate({ path: 'book' })

    resp.makeResponsesOkData(res, review, "RVGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewByBook = async (req, res) => {
  try {

    const review = await mReview.find({ book: req.params.id, status: 'A' })      
      .populate({ path: 'user' })
      .populate({ path: 'book' })
      .sort({ createdAt: -1 })

    resp.makeResponsesOkData(res, review, "RVGetByBook")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewByUser = async (req, res) => {
  try {

    const review = await mReview.find({ user: req.params.id, status: 'A' })
      .populate({ path: 'book' })
      .populate({ path: 'user' })
      .sort({ createdAt: -1 })

    resp.makeResponsesOkData(res, review, "RVGetByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateReview = async (req, res) => {
  try {

    const review = await mReview.findOne({ _id: req.params.id, status: 'A' })

    if (!review) {
      return resp.makeResponsesError(res, "RVNotFound")
    }

    const data = req.body

    const saveReview = await mReview.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        description: data.description,
        rating: data.rating
      }
    })

    resp.makeResponsesOkData(res, saveReview, "RVUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteReview = async (req, res) => {
  try {

    const review = await mReview.findOne({ _id: req.params.id, status: 'A' })

    if (!review) {
      return resp.makeResponsesError(res, "RVNotFound")
    }

    const saveReview = await mReview.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, saveReview, "RVDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setReactionReview = async (req, res) => {
  try {

    const review = await mReview.findOne({ _id: req.params.id, status: 'A' })

    if (!review) {
      return resp.makeResponsesError(res, "RNotFound")
    } else if (await mReactionReview.findOne({ review: req.params.id })) {
      const updateReaction = await mReactionReview.findOneAndUpdate({ review: req.params.id }, {
        $set: {
          users: req.body
        }
      })
      resp.makeResponsesOkData(res, updateReaction, "Success")

    } else {
      const reactionReview = new mReactionReview({
        review: req.params.id,
        users: req.body
      })
      const saveReactionReview = await reactionReview.save()

      resp.makeResponsesOkData(res, saveReactionReview, "ReactionCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReactionReview = async (req, res) => {
  try {
    const reactions = await mReactionReview.find({ review: req.params.id })
      .populate({ path: 'review', select: '_id' })
      .populate({ path: 'users', select: 'firstName lastName' })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewByBook,
  getReviewByUser,
  updateReview,
  deleteReview,

  // User reactions review actions
  setReactionReview,
  getReactionReview,
}