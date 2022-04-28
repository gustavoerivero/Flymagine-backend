const mPost = require('../models/MPost')
const resp = require('../utils/responses')

const createPost = async (req, res) => {
  try {
    const value = req.body

    const post = new mPost({
      idUser: value.idUser,
      description: value.description,
      postDate: value.postDate,
      status: value.status,
      deletedAt: value.deletedAt
    })

    const savePost = await post.save()

    resp.makeResponsesOkData(res, savePost, "PCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
} 

const getAllPosts = async (req, res) => {
  try {

    const posts = await mPost.find()

    resp.makeResponsesOkData(res, posts, "PGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPostByUser = async (req, res) => {
  try {

    const post = await mPost.find({ idUser: req.params.idUser })

    resp.makeResponsesOkData(res, post, "PGetByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPostById = async (req, res) => {
  try {

    const post = await mPost.findById(req.params.id)

    resp.makeResponsesOkData(res, post, "PGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updatePost = async (req, res) => {
  try {

    const value = req.body

    const updatePost = await mPost.findByIdAndUpdate(req.params.id, value, { new: true })

    resp.makeResponsesOkData(res, updatePost, "PUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deletePost = async (req, res) => {
  try {

    const deletePost = await mPost.findByIdAndDelete(req.params.id)

    resp.makeResponsesOkData(res, deletePost, "PDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByUser,
  getPostById,
  updatePost,
  deletePost
}