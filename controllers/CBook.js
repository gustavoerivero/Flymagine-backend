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
      user: value.user,
      name: value.name,
      status: 'A'
    })

    if (book) {
      resp.makeResponsesError(res, "BFound")

    } else if (await mBook.findOne({
      user: value.user,
      name: value.name,
      status: 'I'
    })) {

      const saveBook = await mBook.findOneAndUpdate({ user: value.user, name: value.name }, {
        $set: {
          synopsis: value.synopsis,
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
        user: value.user,
        name: value.name,
        synopsis: value.synopsis,
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
    .sort({ createdAt: -1 })

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


const getFilterBooks = async (req, res) => {
  try {

    const books = await mBook.find({
      $or: [
        { name: { $regex: req.params.search } },
      ],
      status: 'A'
    })
      .populate({ path: 'user', select: 'firstName lastName photo' })
      .sort({ createdAt: -1 })
    resp.makeResponsesOkData(res, books, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const uploadImage = async (req, res) => {  
  try {

    if (!await mBook.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const file = req?.file
    if (!file) {
      return resp.makeResponsesError(res, "UImageError")
    }

    const filename = file?.filename
    const basePath = `${req.protocol}://${req.get('host')}/flymagine/public/images/`

    const saveUser = await mBook.findOneAndUpdate({
      _id: req.params.id,
      status: 'A'
    }, {
      $set: {
        photo: `${basePath}${filename}`
      }
    })

    resp.makeResponsesOkData(res, saveUser, "UUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const uploadDocument = async (req, res) => {  
  try {

    if (!await mBook.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "BNotFound")
    }

    const file = req?.file
    if (!file) {
      return resp.makeResponsesError(res, "UDocumentError")
    }

    const filename = file?.filename
    const basePath = `${req.protocol}://${req.get('host')}/flymagine/public/docs/`
 
    const saveUser = await mBook.findOneAndUpdate({
      _id: req.params.id,
      status: 'A'
    }, {
      $set: {
        document: `${basePath}${filename}`
      }
    })

    resp.makeResponsesOkData(res, saveUser, "UUpdated")

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
      user: req.params.id,
      status: 'A'
    })
    .sort({ createdAt: -1 })

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
    } else if (await mBookGenre.findOne({ book: req.params.id })){
      const genre = await mBookGenre.updateOne({ book: req.params.id }, {
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

    } else {
      const bookGenre = new mBookGenre({
        book: req.params.id,
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

    const book = await mBookGenre.find({ book: req.params.id })
      .populate({ path: 'book', select: 'name' })
      .populate({ path: 'genres', select: 'name' })
    resp.makeResponsesOkData(res, book, "BGenreGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksByGenre = async (req, res) => {
  try {

    const genre = await mBookGenre.find({ genres: req.params.id })
      .populate({ path: 'book', select: 'name' })
      .populate({ path: 'genres', select: 'name' })
    resp.makeResponsesOkData(res, genre, "BGetByGenre")

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
      const deleteBGenre = await mBookGenre.findOneAndDelete({ book: req.params.id }, {
        $set: {
          genres: []
        }
      })

      resp.makeResponsesOkData(res, deleteBGenre, "BGenreDeleted")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  // Book CRUD
  createBook,
  getAllBooks,
  getBookById,
  getFilterBooks,
  updateBook,
  uploadImage,
  uploadDocument,
  deleteBook,
  getBooksByUser,

  // Book actions
  setBookGenre,
  getBookGenre,
  getBooksByGenre,
  deleteBookGenre
}