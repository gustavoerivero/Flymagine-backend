const mHashtag = require('../models/MHashtag')
const resp = require('../utils/responses')

const createHashtag = async (req, res) => {
  try {
    const value = req.body

    const hashtag = await mHashtag.findOne({
      name: value.name,
    })

    if (hashtag) {
      resp.makeResponsesError(res, "HFound")
    } else if (await mHashtag.findOne({
      name: value.name,
    })) {
      const saveHashtag = await mHashtag.findOneAndUpdate({ name: value.name }, {
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

      resp.makeResponsesOkData(res, saveHashtag, "HTCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllHashtags = async (req, res) => {
  try {
    const hashtags = await mHashtag.find({ status: 'A' })
    resp.makeResponsesOkData(res, hashtags, "HTHead")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getHashtagByName = async (req, res) => {
  try {
    const name = req.params.name
    const hashtag = await mHashtag.find({ name: name, status: 'A' })
    resp.makeResponsesOkData(res, hashtag, "HTHead")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateHashtag = async (req, res) => {
  try {
    const id = req.params.id
    const value = req.body

    if (await mHashtag.findById(id)) {
      resp.makeResponsesError(res, "HTFound")
    } else {

      const hashtag = await mHashtag.findOne({ _id: id, status: 'A' }, {
        $set: {
          name: value.name,
        }
      })

      resp.makeResponsesOkData(res, hashtag, "HTUpdated")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteHashtag = async (req, res) => {
  try {
    
    const id = req.params.id

    if (await mHashtag.findById(id)) {
      resp.makeResponsesError(res, "HTFound")
    } else {

      const hashtag = await mHashtag.findOneAndUpdate({ _id: id }, {
        $set: {
          status: 'I',
          deletedAt: new Date()
        }
      })

      resp.makeResponsesOkData(res, hashtag, "HTDeleted")
    }

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