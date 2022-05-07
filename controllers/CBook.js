// Book imports
const mBook = require('../models/mBook')
const resp = require('../utils/responses')

// BookGenre imports
const mBookGenre = require('../models/mBookGenre')

// Book CRUD
const createBook = async (req, res) => {
  try {

    const value = req.body

    const book = await mBook.findOne({
      idUser: value.idUser,
      name: value.name,
      status: 'A'
    })

    if (book) {
      resp.makeResponsesError(res, "BFound")

    } else if (await mBook.findOne({
      idUser: value.idUser,
      name: value.name,
      status: 'I'
    })) {

      const saveBook = await mBook.findOneAndUpdate({ idUser: value.idUser, name: value.name }, {
        $set: {
          sypnosis: value.sypnosis,
          photo: value.photo,
          document: value.document,
          creationDate: value.creationDate,
          status: 'A',
          deletedAt: null
        }
      })

      resp.makeResponsesOkData(res, saveBook, "Success")

    } else {

      const book = new mBook({
        idUser: value.idUser,
        name: value.name,
        sypnosis: value.sypnosis,
        photo: value.photo,
        document: value.document,
        creationDate: value.creationDate,
      })

      const saveBook = await book.save()

      resp.makeResponsesOkData(res, saveBook, "BCreated")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllBooks = async (req, res) => {
  try {

    const books = await mBook.find({ status: 'A' })

    resp.makeResponsesOkData(res, books, "BGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBookById = async (req, res) => {
  try {

    const book = await mBook.findOne({ _id: req.params.id, status: 'A' })

    resp.makeResponsesOkData(res, book, "BGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateBook = async (req, res) => {
  try {

    const book = await mBook.findOne({ _id: req.params.id, status: 'A' })

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    }

    const data = req.body

    const saveBook = await mBook.findByIdAndUpdate(req.params.id, data)

    resp.makeResponsesOkData(res, saveBook, "BUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteBook = async (req, res) => {
  try {

    const book = await mBook.findOne({ _id: req.params.id, status: 'A' })

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    }

    const saveBook = await mBook.findByIdAndUpdate(req.params.id, {
      status: 'I',
      deletedAt: new Date()
    })

    resp.makeResponsesOkData(res, saveBook, "BDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksByUser = async (req, res) => {
  try {

    const books = await mBook.find({
      idUser: req.params.id,
      status: 'A'
    })

    resp.makeResponsesOkData(res, books, "BGetByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

/**
 * Book actions
 */

const setBookGenre = async (req, res) => {
  try {

    const book = await mBook.findOne({ _id: req.params.id, status: 'A' })

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    } else if (await mBookGenre.findOne({ idBook: req.params.id, idLiteraryGenre: req.body.idLiteraryGenre })) {
      return resp.makeResponsesError(res, "BGenreFound")
    } else {
      const bookGenre = new mBookGenre({
        idBook: req.params.id,
        idLiteraryGenre: req.body.idLiteraryGenre
      })
      const saveBookGenre = await bookGenre.save()

      resp.makeResponsesOkData(res, saveBookGenre, "BGenreCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBookGenres = async (req, res) => {
  try {

    const book = await mBookGenre.find({ idBook: req.params.id })
    resp.makeResponsesOkData(res, book, "BGenreGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksByGenre = async (req, res) => {
  try {

    const genre = await mBookGenre.find({ idLiteraryGenre: req.params.id })
    resp.makeResponsesOkData(res, genre, "BGetByGenre")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  // Book CRUD
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByUser,

  // Book actions
  setBookGenre,
  getBookGenres,
  getBooksByGenre
}