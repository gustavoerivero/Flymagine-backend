const mLiteraryGenre = require('../models/MLiteraryGenre')
const resp = require('../utils/responses')

const createLiteraryGenre = async (req, res) => {
  try {
    const value = req.body

    if (await mLiteraryGenre.findOne({ name: value.name, status: 'A' })) {
      resp.makeResponsesError(res, `Literary genre don't exist`, "LGFound")
    } else if (await mLiteraryGenre.findOne({ name: value.name, status: 'I' })) {
      const saveLiteraryGenre = await mLiteraryGenre.findOneAndUpdate({ name: value.name }, {
        $set: {
          status: 'A',
          deletedAt: null
        }
      })
      resp.makeResponsesOkData(res, saveLiteraryGenre, "Success")
    } else {
      const literaryGenre = new mLiteraryGenre({
        name: value.name,
      })

      const saveLiteraryGenre = await literaryGenre.save()

      resp.makeResponsesOkData(res, saveLiteraryGenre, "LGCreated")
    }

  } catch (error) {
    resp.makeResponsesError(res, error, 'UnexpectedError')
  }
}

const getAllLiteraryGenres = async (req, res) => {
  try {

    const literaryGenres = await mLiteraryGenre.find({ status: 'A' })

    resp.makeResponsesOkData(res, literaryGenres, "LGGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error, 'UnexpectedError')
  }
}

const getLiteraryGenreById = async (req, res) => {
  try {

    const literaryGenre = await mLiteraryGenre.findOne({ _id: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, literaryGenre, "LGGetById")

  } catch (error) {
    resp.makeResponsesError(res, error, 'LGNotFound')
  }
}

const updateLiteraryGenre = async (req, res) => {
  try {

    const literaryGenre = await mLiteraryGenre.findOne({ _id: req.params.id, status: 'A' })

    if (!literaryGenre) {
      return resp.makeResponsesError(res, `Literary genre don't exist`, "LGNotFound")
    }

    const saveLiteraryGenre = await mLiteraryGenre.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        name: req.body.name
      }
    })

    resp.makeResponsesOkData(res, saveLiteraryGenre, "LGUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error, 'UnexpectedError')
  }
}

const deleteLiteraryGenre = async (req, res) => {
  try {

    const literaryGenre = await mLiteraryGenre.findById(req.params.id)

    if (!literaryGenre) {
      return resp.makeResponsesError(res, `Literary genre don't exist`, "LGNotFound")
    }

    const saveLiteraryGenre = await mLiteraryGenre.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, saveLiteraryGenre, "LGDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error, 'UnexpectedError')
  }
}

module.exports = {
  createLiteraryGenre,
  getAllLiteraryGenres,
  getLiteraryGenreById,
  updateLiteraryGenre,
  deleteLiteraryGenre,
}
