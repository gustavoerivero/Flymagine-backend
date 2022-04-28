const mLiteraryGenre = require('../models/MLiteraryGenre')
const resp = require('../utils/responses')

const createLiteraryGenre = async (req, res) => {
  try {
    const value = req.body

    const literaryGenre = new mLiteraryGenre({
      name: value.name,
    })

    const saveLiteraryGenre = await literaryGenre.save()

    resp.makeResponsesOkData(res, saveLiteraryGenre, "LCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllLiteraryGenres = async (req, res) => {
  try {

    const literaryGenres = await mLiteraryGenre.find()

    resp.makeResponsesOkData(res, literaryGenres, "LGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getLiteraryGenreById = async (req, res) => {
  try {

    const literaryGenre = await mLiteraryGenre.findById(req.params.id)

    resp.makeResponsesOkData(res, literaryGenre, "LGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateLiteraryGenre = async (req, res) => {
  try {

    const literaryGenre = await mLiteraryGenre.findById(req.params.id)

    if (!literaryGenre) {
      return resp.makeResponsesError(res, "LNotFound")
    }

    const value = req.body

    literaryGenre.name = value.name
    literaryGenre.deletedAt = value.deletedAt
    literaryGenre.status = value.status

    const saveLiteraryGenre = await literaryGenre.save()

    resp.makeResponsesOkData(res, saveLiteraryGenre, "LUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteLiteraryGenre = async (req, res) => {
  try {

    const literaryGenre = await mLiteraryGenre.findById(req.params.id)

    if (!literaryGenre) {
      return resp.makeResponsesError(res, "LNotFound")
    }

    literaryGenre.deletedAt = new Date()

    const saveLiteraryGenre = await literaryGenre.save()

    resp.makeResponsesOkData(res, saveLiteraryGenre, "LDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createLiteraryGenre,
  getAllLiteraryGenres,
  getLiteraryGenreById,
  updateLiteraryGenre,
  deleteLiteraryGenre,
}
