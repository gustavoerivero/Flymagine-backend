// Book imports
const mBook = require('../models/MBook')
const resp = require('../utils/responses')

// BookGenre imports
const mBookGenre = require('../models/MBookGenre')

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
    } else if (await mBookGenre.findOne({ idBook: req.params.id, genres: req.body.genres })) {
      return resp.makeResponsesError(res, "BGenreFound")
    } else {
      const bookGenre = new mBookGenre({
        idBook: req.params.id,
        genres: req.body
      })
      const saveBookGenre = await bookGenre.save()

      resp.makeResponsesOkData(res, saveBookGenre, "BGenreCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBookGenre = async (req, res) => {
  try {

    const book = await mBookGenre.find({ idBook: req.params.id })
      .populate({ path: 'idBook', select: 'name' })
      .populate({ path: 'genres', select: 'name' })
    resp.makeResponsesOkData(res, book, "BGenreGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksByGenre = async (req, res) => {
  try {

    const genre = await mBookGenre.find({ idLiteraryGenre: req.params.id })
      .populate({ path: 'idBook', select: 'name' })
      .populate({ path: 'genres', select: 'name' })
    resp.makeResponsesOkData(res, genre, "BGetByGenre")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateBookGenre = async (req, res) => {
  try {

    const book = await mBook.findOne({ _id: req.params.id, status: 'A' })

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    } else {
      const genre = await mBookGenre.findOneAndUpdate({ idBook: req.params.id }, {
        $set: {
          genres: req.body
        },
        function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      })

      resp.makeResponsesOkData(res, genre, "BGenreUpdated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteBookGenre = async (req, res) => {
  try {
    const book = await mBook.findOne({ _id: req.params.id, status: 'A' })

    if (!book) {
      return resp.makeResponsesError(res, "BNotFound")
    } else {
      const deleteBGenre = await mBookGenre.findOneAndDelete({ idBook: req.params.id }, {
        $set: {
          genres: []
        },
        function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      })
    }

    resp.makeResponsesOkData(res, deleteBGenre, "BGenreDeleted")

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
  getBookGenre,
  getBooksByGenre,
  updateBookGenre,
  deleteBookGenre
}