const mPhotoPost = require('../models/MPhotoPost')
const resp = require('../utils/responses')

const createPhotoPost = async (req, res) => {
  try {
    const value = req.body

    const photoPost = new mPhotoPost({
      idPost: value.idPost,
      image: value.image,
    })

    const savePhotoPost = await photoPost.save()

    resp.makeResponsesOkData(res, savePhotoPost, "PHCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPhotoPost = async (req, res) => {
  try {
    const id = req.params.id

    const photoPost = await mPhotoPost.findById(id)

    resp.makeResponsesOkData(res, photoPost, "PHFound")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllPhotoPosts = async (req, res) => {
  try {
    const photoPosts = await mPhotoPost.find()

    resp.makeResponsesOkData(res, photoPosts, "PHFound")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPhotoPostbyPost = async (req, res) => {
  try {
    const id = req.params.id

    const photoPost = await mPhotoPost.find({ idPost: id })

    resp.makeResponsesOkData(res, photoPost, "PHFound")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updatePhotoPost = async (req, res) => {
  try {
    const id = req.params.id
    const value = req.body

    const photoPost = await mPhotoPost.findByIdAndUpdate(id, value, { new: true })

    resp.makeResponsesOkData(res, photoPost, "PHUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deletePhotoPost = async (req, res) => {
  try {
    const id = req.params.id

    const photoPost = await mPhotoPost.findByIdAndDelete(id)

    resp.makeResponsesOkData(res, photoPost, "PHDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createPhotoPost,
  getPhotoPost,
  getAllPhotoPosts,
  getPhotoPostbyPost,
  updatePhotoPost,
  deletePhotoPost
}