const mCommentReview = require('../models/MCommentReview')
const resp = require('../utils/responses')

const createCommentReview = async (req, res) => {
  try {
    const value = req.body

    const commentReview = new mCommentReview({
      idUser: value.idUser,
      idReview: value.idReview,
      description: value.description,
      commentDate: value.commentDate,
    })

    const saveCommentReview = await commentReview.save()

    resp.makeResponsesOkData(res, saveCommentReview, "CCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReview = async (req, res) => {
  try {
    const id = req.params.id

    const commentReview = await mCommentReview.findById(id)

    resp.makeResponsesOkData(res, commentReview, "CGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviews = async (req, res) => {
  try {
    const commentReviews = await mCommentReview.find()

    resp.makeResponsesOkData(res, commentReviews, "CGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviewsByReview = async (req, res) => {
  try {
    const id = req.params.id

    const commentReviews = await mCommentReview.find({ idReview: id })

    resp.makeResponsesOkData(res, commentReviews, "CGetAllByReview")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviewsByUser = async (req, res) => {
  try {
    const id = req.params.id

    const commentReviews = await mCommentReview.find({ idUser: id })

    resp.makeResponsesOkData(res, commentReviews, "CGetAllByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateCommentReview = async (req, res) => {
  try {
    const id = req.params.id
    const value = req.body

    const commentReview = await mCommentReview.findByIdAndUpdate(id, value, { new: true })

    resp.makeResponsesOkData(res, commentReview, "CUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteCommentReview = async (req, res) => {
  try {
    const id = req.params.id

    const commentReview = await mCommentReview.findByIdAndDelete(id)

    resp.makeResponsesOkData(res, commentReview, "CDeleted")

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