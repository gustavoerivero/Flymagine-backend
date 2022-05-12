const mPost = require('../models/MPost')
const resp = require('../utils/responses')

// UserTag imports
const mUserTag = require('../models/MUserTag')

// HashtagTag imports
const mHashtagTag = require('../models/MPostTag')

const createPost = async (req, res) => {
  try {
    const value = req.body

    const post = new mPost({
      idUser: value.idUser,
      description: value.description
    })

    const savePost = await post.save()

    resp.makeResponsesOkData(res, savePost, "PCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllPosts = async (req, res) => {
  try {

    const posts = await mPost.find({ status: 'A' })

    resp.makeResponsesOkData(res, posts, "PGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPostByUser = async (req, res) => {
  try {

    const post = await mPost.find({ idUser: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, post, "PGetByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPostById = async (req, res) => {
  try {

    const post = await mPost.findOne({ _id: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, post, "PGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updatePost = async (req, res) => {
  try {

    const value = req.body

    const updatePost = await mPost.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        description: value.description
      }
    })

    resp.makeResponsesOkData(res, updatePost, "PUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deletePost = async (req, res) => {
  try {

    const deletePost = await mPost.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, deletePost, "PDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setUserTag = async (req, res) => {
  try {

    const post = await mPost.findOne({ _id: req.params.id, status: 'A' })

    if (!post) {

      return resp.makeResponsesError(res, "PNotFound")

    } else if (await mUserTag.findOne({ idPost: req.params.id, idUser: value.idUser})) {

      resp.makeResponsesError(res, "TFound")

    } else {
      const userTag = new mUserTag({
        idPost: req.params.id,
        idUser: value.idUser,
      })
      const saveUserTag = await userTag.save()
      resp.makeResponsesOkData(res, saveUserTag, "Success")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setHashtagTag = async (req, res) => {
  try {

    const post = await mPost.findOne({ _id: req.params.id, status: 'A' })

    if (!post) {

      return resp.makeResponsesError(res, "PNotFound")

    } else if (await mHashtagTag.findOne({ idPost: req.params.id, idHashtag: value.idHashtag})) {

      resp.makeResponsesError(res, "TFound")

    } else {
      const hashtagTag = new mHashtagTag({
        idPost: req.params.id,
        idHashtag: value.idHashtag,
      })
      const saveHashtagTag = await hashtagTag.save()
      resp.makeResponsesOkData(res, saveHashtagTag, "Success")
    }

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
  deletePost,

  // User tag actions
  setUserTag,

  // Hashtag tag actions
  setHashtagTag,
}