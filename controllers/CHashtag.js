const mHashtag = require('../models/MHashtag')
const resp = require('../utils/responses')

const createHashtag = async (req, res) => {
  try {
    const value = req.body

    if (await mHashtag.findOne({ name: value.name, status: 'A' })) {
      resp.makeResponsesError(res, "HFound")
    } else if (await mHashtag.findOne({
      name: value.name,
    })) {
      const saveHashtag = await mHashtag.findOneAndUpdate({ name: value.name, status: 'I' }, {
        $set: {
          status: 'A',
          deletedAt: null
        }
      })
      resp.makeResponsesOkData(res, saveHashtag, "Success")
    } else {

      const hashtag = new mHashtag({
        name: value.name,
      })

      const saveHashtag = await hashtag.save()

      resp.makeResponsesOkData(res, saveHashtag, "HCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllHashtags = async (req, res) => {
  try {
    const hashtags = await mHashtag.find({ status: 'A' })
    resp.makeResponsesOkData(res, hashtags, "HGet")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getHashtagByName = async (req, res) => {
  try {
    const name = req.params.name
    const hashtag = await mHashtag.find({ name: name, status: 'A' })
    resp.makeResponsesOkData(res, hashtag, "HGetByName")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getHashtagById = async (req, res) => {
  try {
    const id = req.params.id
    const getHashtag = await mHashtag.findOne({ _id: id, status: 'A' })
    resp.makeResponsesOkData(res, getHashtag, id)
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateHashtag = async (req, res) => {
  try {
    const id = req.params.id
    if (await mHashtag.findOne({ name: req.body.name, status: 'A' })) {
      resp.makeResponsesError(res, "HFound")
    } else {

      const hashtag = await mHashtag.findOneAndUpdate({ _id: id, status: 'A' }, {
        $set: {
          name: req.body.name,
        }
      })
      console.log(id)
      resp.makeResponsesOkData(res, hashtag, "HUpdated")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteHashtag = async (req, res) => {
  try {

    if (!await mHashtag.findOne({ _id: req.params.id, status: 'A' })) {
      resp.makeResponsesError(res, "HNotFound")
    } else {

      const hashtag = await mHashtag.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
          status: 'I',
          deletedAt: new Date()
        }
      })

      resp.makeResponsesOkData(res, hashtag, "HDeleted")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createHashtag,
  getAllHashtags,
  getHashtagByName,
  getHashtagById,
  updateHashtag,
  deleteHashtag,
}