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

    resp.makeResponsesOkData(res, saveCommentReview, "CRCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReview = async (req, res) => {
  try {

    const commentReview = await mCommentReview.findOne({ _id: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, commentReview, "CRGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviews = async (req, res) => {
  try {
    const commentReviews = await mCommentReview.find({ status: 'A' })

    resp.makeResponsesOkData(res, commentReviews, "CRGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviewsByReview = async (req, res) => {
  try {

    const commentReviews = await mCommentReview.find({ idReview: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, commentReviews, "CRGetAllByReview")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentReviewsByUser = async (req, res) => {
  try {

    const commentReviews = await mCommentReview.find({ idUser: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, commentReviews, "CGetAllByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateCommentReview = async (req, res) => {
  try {
    const value = req.body

    if (!await mCommentReview.findOne({ _id: req.params.id, status: 'A' })) {

      return resp.makeResponsesError(res, "CRNotFound")

    } else {

      const commentReview = await mCommentReview.findByIdAndUpdate(req.params.id, {
        $set: {
          description: value.description
        }
      })

      resp.makeResponsesOkData(res, commentReview, "CRUpdated")


    }

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