const mCommentPost = require('../models/MCommentPost')
const resp = require('../utils/responses')

const createCommentPost = async (req, res) => {
  try {
    const value = req.body
    const commentPost = new mCommentPost({
      post: value.post,
      user: value.user,
      description: value.description,
      usersLiked: [],
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
    const commentPost = await mCommentPost.find({ post: req.params.id, status: 'A' })
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
    const commentPost = await mCommentPost.find({ user: req.params.id, status: 'A' })
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateCommentPost = async (req, res) => {
  try {

    const commentPost = await mCommentPost.findOne({ _id: req.params.id, status: 'A' })

    if (!commentPost) {
      return resp.makeResponsesError(res, "CPNotFound")
    }

    const saveCommentPost = await mCommentPost.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: req.body
    })

    resp.makeResponsesOkData(res, saveCommentPost, "CPUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const uploadImage = async (req, res) => {
  try {
    const commentPost = await mCommentPost.findOne({ _id: req.params.id, status: 'A' })

    if (!commentPost) {
      return resp.makeResponsesError(res, "CPNotFound")
    }

    const file = req?.file
    if (!file) {
      return resp.makeResponsesError(res, "UImageError")
    }

    const filename = file?.filename
    const basePath = `${req.protocol}://${req.get('host')}/flymagine/public/images/`

    const saveCommentPost = await mCommentPost.findOneAndUpdate({
      _id: req.params.id,
      status: 'A'
    }, {
      $set: {
        photo: `${basePath}${filename}`
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
  uploadImage,
  deleteCommentPost,
}