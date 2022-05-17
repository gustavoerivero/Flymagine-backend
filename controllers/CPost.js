const mPost = require('../models/MPost')
const resp = require('../utils/responses')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ReactionPost imports
const mReactionPost = require('../models/MReactionPost')

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

const getFeedPosts = async (req, res) => {
  
  const posts = await mPost.find({
    idUser: {
      $in: req.body
    },
    status: 'A'
  })
  resp.makeResponsesOkData(res, posts, "PGetPosts")

  try {

  } catch (error) {
    resp.makeResponsesError(res, error)
  }

}

const uploadImage = async (req, res) => {
  try {

    if (!await mPost.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const file = req?.file
    if (!file) {
      return resp.makeResponsesError(res, "UImageError")
    }

    const filename = file?.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/images/`

    const savePost = await mPost.findOneAndUpdate({
      _id: req.params.id,
      status: 'A'
    }, {
      $set: {
        photo: `${basePath}${filename}`
      }
    })

    resp.makeResponsesOkData(res, savePost, "PUpdated")

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

    } else if (await mUserTag.findOne({ idPost: req.params.id, users: value.users })) {

      resp.makeResponsesError(res, "TFound")

    } else {
      const userTag = new mUserTag({
        idPost: req.params.id,
        users: value.users,
      })
      const saveUserTag = await userTag.save()
      resp.makeResponsesOkData(res, saveUserTag, "Success")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getUserTagByPost = async (req, res) => {
  try {
    const reactions = await mReactionPost.find({ idPost: req.params.id })
      .populate({ path: 'idPost', select: '_id' })
      .populate({ path: 'users', select: 'firstName lastName' })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setHashtagTag = async (req, res) => {
  try {

    const post = await mPost.findOne({ _id: req.params.id, status: 'A' })

    if (!post) {

      return resp.makeResponsesError(res, "PNotFound")

    } else if (await mHashtagTag.findOne({ idPost: req.params.id, hashtags: value.hashtags })) {

      resp.makeResponsesError(res, "TFound")

    } else {
      const hashtagTag = new mHashtagTag({
        idPost: req.params.id,
        hashtags: value.hashtags,
      })
      const saveHashtagTag = await hashtagTag.save()
      resp.makeResponsesOkData(res, saveHashtagTag, "Success")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getHashtagTagByPost = async (req, res) => {
  try {
    const reactions = await mReactionPost.find({ idPost: req.params.id })
      .populate({ path: 'idPost', select: '_id' })
      .populate({ path: 'hashtags', select: 'name' })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setReactionPost = async (req, res) => {
  try {

    const post = await mPost.findOne({ _id: req.params.id, status: 'A' })

    if (!post) {
      return resp.makeResponsesError(res, "PNotFound")
    } else if (await mReactionPost.findOne({ idPost: req.params.id })) {
      const updateReaction = await mReactionPost.findOneAndUpdate({ idPost: req.params.id }, {
        $set: {
          users: req.body
        }
      })
      resp.makeResponsesOkData(res, updateReaction, "Success")

    } else {
      const reactionPost = new mReactionPost({
        idPost: req.params.id,
        users: req.body
      })
      const saveReactionPost = await reactionPost.save()

      resp.makeResponsesOkData(res, saveReactionPost, "ReactionCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReactionPost = async (req, res) => {
  try {
    const reactions = await mReactionPost.find({ idPost: req.params.id })
      .populate('users')
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByUser,
  getPostById,
  getFeedPosts,
  uploadImage,
  updatePost,
  deletePost,

  // Reaction Post actions
  setReactionPost,
  getReactionPost,

  // User tag actions
  setUserTag,
  getUserTagByPost,

  // Hashtag tag actions
  setHashtagTag,
  getHashtagTagByPost,
}