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
    const commentPosts = await mCommentPost.find()
    resp.makeResponsesOkData(res, commentPosts, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentPostByPost = async (req, res) => {
  try {
    const idPost = req.params.idPost
    const commentPost = await mCommentPost.find({ idPost: idPost })
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentPostById = async (req, res) => {
  try {
    const idCommentPost = req.params.idCommentPost
    const commentPost = await mCommentPost.findById(idCommentPost)
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getCommentPostByUser = async (req, res) => {
  try {
    const idUser = req.params.idUser
    const commentPost = await mCommentPost.find({ idUser: idUser })
    resp.makeResponsesOkData(res, commentPost, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateCommentPost = async (req, res) => {
  try {
    const idCommentPost = req.params.idCommentPost
    const value = req.body

    const commentPost = await mCommentPost.findById(idCommentPost)

    if (!commentPost) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const saveCommentPost = await commentPost.updateOne({
      idPost: value.idPost,
      idUser: value.idUser,
      description: value.description,
    })

    resp.makeResponsesOkData(res, saveCommentPost, "UPCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteCommentPost = async (req, res) => {
  try {
    const idCommentPost = req.params.idCommentPost

    const commentPost = await mCommentPost.findById(idCommentPost)

    if (!commentPost) {
      return resp.makeResponsesError(res, "DNotFound")
    }

    const deleteCommentPost = await commentPost.remove()

    resp.makeResponsesOkData(res, deleteCommentPost, "DDeleted")

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