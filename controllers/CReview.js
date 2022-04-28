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

    resp.makeResponsesOkData(res, saveReview, "RCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllReviews = async (req, res) => {
  try {

    const reviews = await mReview.find()

    resp.makeResponsesOkData(res, reviews, "RGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewById = async (req, res) => {
  try {

    const review = await mReview.findById(req.params.id)

    resp.makeResponsesOkData(res, review, "RGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewByBook = async (req, res) => {
  try {

    const review = await mReview.find({ idBook: req.params.idBook })

    resp.makeResponsesOkData(res, review, "RGetByBook")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReviewByUser = async (req, res) => {
  try {

    const review = await mReview.find({ idUser: req.params.idUser })

    resp.makeResponsesOkData(res, review, "RGetByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateReview = async (req, res) => {
  try {

    const review = await mReview.findById(req.params.id)

    if (!review) {
      return resp.makeResponsesError(res, "RNotFound")
    }

    const data = req.body

    const saveReview = await review.updateOne({
      _id: req.params.id,
    }, {
      $set: data
    })

    resp.makeResponsesOkData(res, updateReview, "RUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteReview = async (req, res) => {
  try {

    const review = await mReview.findById(req.params.id)

    if (!review) {
      return resp.makeResponsesError(res, "RNotFound")
    }

    const saveReview = await review.updateOne({
      _id: req.params.id,
    }, {
      $set: {
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, deleteReview, "RDeleted")

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