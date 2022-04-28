const mHashtag = require('../models/MHashtag')
const resp = require('../utils/responses')

const createHashtag = async (req, res) => {
  try {
    const value = req.body

    const hashtag = new mHashtag({
      name: value.name,
    })

    const saveHashtag = await hashtag.save()

    resp.makeResponsesOkData(res, saveHashtag, "HTCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllHashtags = async (req, res) => {
  try {
    const hashtags = await mHashtag.find()
    resp.makeResponsesOkData(res, hashtags, "HTHead")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getHashtagByName = async (req, res) => {
  try {
    const name = req.params.name
    const hashtag = await mHashtag.find({ name: name })
    resp.makeResponsesOkData(res, hashtag, "HTHead")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateHashtag = async (req, res) => {
  try {
    const id = req.params.id
    const value = req.body

    const hashtag = await mHashtag.findByIdAndUpdate(id, value)
    resp.makeResponsesOkData(res, hashtag, "HTUpdated")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteHashtag = async (req, res) => {
  try {
    const id = req.params.id
    const hashtag = await mHashtag.findOneAndDelete({ name: name })
    resp.makeResponsesOkData(res, hashtag, "HTDeleted")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createHashtag,
  getAllHashtags,
  getHashtagByName,
  updateHashtag,
  deleteHashtag,
}