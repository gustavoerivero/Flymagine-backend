const mReview = require('../models/MReview')
const resp = require('../utils/responses')

const createReview = async (req, res) => {
  try {
    const value = req.body

    const review = new mReview({
      idUser: value.idUser,
      idBook: value.idBook,
      description: value.description,
      rating: value.rating,
    })

    const saveReview = await review.save()

    resp.makeResponsesOkData(res, saveReview, "RVCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllReviews = async (req, res) => {
  try {

    const reviews = await mReview.find({ status: 'A' })

    resp.makeResponsesOkData(res, reviews, "RVGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewById = async (req, res) => {
  try {

    const review = await mReview.findOne({ _id: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, review, "RVGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewByBook = async (req, res) => {
  try {

    const review = await mReview.find({ idBook: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, review, "RVGetByBook")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewByUser = async (req, res) => {
  try {

    const review = await mReview.find({ idUser: req.params.id, status: 'A' })

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

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewByBook,
  getReviewByUser,
  updateReview,
  deleteReview,
}