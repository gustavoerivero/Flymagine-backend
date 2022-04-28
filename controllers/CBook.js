const mBook = require('../models/mBook.js')
const resp = require('../utils/responses')

const createBook = async (req, res) => {
  try {
    const value = req.body

    const book = new mBook({
      idUser: value.idUser,
      name: value.name,
      sypnosis: value.sypnosis,
      photo: value.photo,
      document: value.document,
      postDate: value.postDate,
      creationDate: value.creationDate,
    })

    const saveBook = await book.save()

    resp.makeResponsesOkData(res, saveBook, "BCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllBooks = async (req, res) => {
  try {

    const books = await mBook.find()

    resp.makeResponsesOkData(res, books, "BGetAll")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBookById = async (req, res) => {
  try {

    const book = await mBook.findById(req.params.id)

    resp.makeResponsesOkData(res, book, "BGetById")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateBook = async (req, res) => {
  try {

    const book = await mBook.findById(req.params.id)

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    }

    const data = req.body

    const saveBook = await book.updateOne({
      _id: req.params.id,
    }, {
      $set: data
    })

    resp.makeResponsesOkData(res, updateBook, "BUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteBook = async (req, res) => {
  try {

    const book = await mBook.findById(req.params.id)

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    }

    const saveBook = await book.updateOne({
      _id: req.params.id,
    }, {
      $set: {
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, deleteBook, "BDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksByUser = async (req, res) => {
  try {

    const books = await mBook.find({
      idUser: req.params.id
    })

    resp.makeResponsesOkData(res, books, "BGetByUser")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getBooksByUser,
}