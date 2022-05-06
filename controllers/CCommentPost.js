const mCommentPost = require('../models/MCommentPost')
const resp = require('../utils/responses')

const createCommentPost = async (req, res) => {
  try {
    const value = req.body
    const commentPost = new mCommentPost({
      idPost: value.idPost,
      idUser: value.idUser,
      description: value.description,
    })

    const saveCommentPost = await commentPost.save()

    resp.makeResponsesOkData(res, saveCommentPost, "CPCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllCommentPost = async (req, res) => {
  try {
    const commentPosts = await mCommentPost.find({ status: 'A'})
    resp.makeResponsesOkData(res, commentPosts, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentPostByPost = async (req, res) => {
  try {
    const commentPost = await mCommentPost.find({ idPost: req.params.id, status: 'A' })
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentPostById = async (req, res) => {
  try {
    const commentPost = await mCommentPost.findOne({ _id: req.params.id, status: 'A' })
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentPostByUser = async (req, res) => {
  try {
    const commentPost = await mCommentPost.find({ idUser: req.params.id, status: 'A' })
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateCommentPost = async (req, res) => {
  try {

    const value = req.body

    const commentPost = await mCommentPost.findOne({ _id: req.params.id, status: 'A' })

    if (!commentPost) {
      return resp.makeResponsesError(res, "CPNotFound")
    }

    const saveCommentPost = await mCommentPost.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        description: value.description,
      }
    })

    resp.makeResponsesOkData(res, saveCommentPost, "CPUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteCommentPost = async (req, res) => {
  try {

    const commentPost = await mCommentPost.findById(req.params.id)

    if (!commentPost) {
      return resp.makeResponsesError(res, "CPNotFound")
    }

    const deleteCommentPost = await mCommentPost.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, deleteCommentPost, "CPDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createCommentPost,
  getAllCommentPost,
  getCommentPostByPost,
  getCommentPostById,
  getCommentPostByUser,
  updateCommentPost,
  deleteCommentPost,
}