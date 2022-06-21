const mCommentReview = require('../models/MCommentReview')
const resp = require('../utils/responses')

const createCommentReview = async (req, res) => {
  try {
    const value = req.body

    const commentReview = new mCommentReview({
      user: value.user,
      review: value.review,
      description: value.description,
      usersLiked: [],
    })

    const saveCommentReview = await commentReview.save()
    const commentReviewPopulated = await mCommentReview.findOne({ _id: saveCommentReview._id })
      .populate({ path: 'user' })
      .populate({ path: 'review' })

    resp.makeResponsesOkData(res, commentReviewPopulated, "CRCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReview = async (req, res) => {
  try {

    const commentReview = await mCommentReview.findOne({ _id: req.params.id, status: 'A' })
      .populate({ path: 'user' })

    resp.makeResponsesOkData(res, commentReview, "CRGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviews = async (req, res) => {
  try {
    const commentReviews = await mCommentReview.find({ status: 'A' })
      .populate({ path: 'user' })

    resp.makeResponsesOkData(res, commentReviews, "CRGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviewsByReview = async (req, res) => {
  try {

    const commentReviews = await mCommentReview.find({ review: req.params.id, status: 'A' })
      .populate({ path: 'user' })

    resp.makeResponsesOkData(res, commentReviews, "CRGetAllByReview")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviewsByUser = async (req, res) => {
  try {

    const commentReviews = await mCommentReview.find({ user: req.params.id, status: 'A' })
      .populate({ path: 'user' })

    resp.makeResponsesOkData(res, commentReviews, "CGetAllByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateCommentReview = async (req, res) => {
  try {

    const commentReview = await mCommentReview.findOne({ _id: req.params.id, status: 'A' })

    if (!commentReview) {
      return resp.makeResponsesError(res, "CRNotFound")
    }

    const saveCommentReview = await mCommentReview.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: req.body
    })

    resp.makeResponsesOkData(res, saveCommentReview, "CRUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteCommentReview = async (req, res) => {
  try {

    const commentReview = await mCommentReview.findById(req.params.id)

    if (!commentReview) {
      return resp.makeResponsesError(res, "CRNotFound")
    }

    const deleteCommentReview = await mCommentReview.findByIdAndUpdate(req.params.id, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, deleteCommentReview, "CRDeleted")


  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createCommentReview,
  getCommentReview,
  getCommentReviews,
  getCommentReviewsByReview,
  getCommentReviewsByUser,
  updateCommentReview,
  deleteCommentReview
}