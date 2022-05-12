// User imports
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mUser = require('../models/MUser')
const resp = require('../utils/responses')
const validate = require('../utils/validate')

// UserBook imports
const mUserBook = require('../models/MUserBook')
const { get } = require('express/lib/response')

// PersonalPreference imports
const mPersonalPreference = require('../models/MPersonalPreference')

// ReactionPost imports
const mReactionPost = require('../models/MReactionPost')

// ReactionReview imports
const mReactionReview = require('../models/MReactionReview')



/**
 * User CRUD
 */
const createUser = async (req, res) => {
  try {
    const value = req.body

    const _User = await mUser.findOne({
      email: value.email,
      status: 'A'
    })

    if (_User) {

      resp.makeResponsesError(res, "UFound")

    } else if (await mUser.findOne({
      email: value.email,
      status: 'I'
    })) {

      const saveUser = await mUser.findOneAndUpdate({ email: value.email }, {
        $set: {
          status: 'A',
          deletedAt: null
        }
      })

      resp.makeResponsesOkData(res, saveUser, "Success")

    } else {

      const user = new mUser({
        idRole: value.idRole,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: bcrypt.hashSync(value.password),
        photo: value.photo,
        address: value.address,
        phone: value.phone,
        biography: value.biography,
        birthday: value.birthday
      })

      const saveUser = await user.save()
      console.log(saveUser)
      resp.makeResponsesOkData(res, saveUser, "UCreated")

    }

  } catch (error) {
    resp.makeResponsesException(res, error)
  }
}

const login = async (req, res) => {
  try {

    const valUser = await mUser.findOne({
      email: req.body.email
    })

    if (!valUser) {
      return resp.makeResponsesError(res, "ULoginError1")
    }

    const valPass = await validate.comparePassword(req.body.password, valUser.password)

    if (!valPass) {
      return resp.makeResponsesError(res, "ULoginError2")
    }

    const token = jwt.sign({ id: valUser._id, }, "Flymagine-secret", { expiresIn: "86400" })

    const user = {
      id: valUser._id,
      idRole: valUser.idRole,
      firstName: valUser.firstName,
      lastName: valUser.lastName,
      email: valUser.email,
      photo: valUser.photo,
      address: valUser.address,
      phone: valUser.phone,
      birthday: valUser.birthday,
      biography: valUser.biography,
      token: token
    }

    resp.makeResponsesOkData(res, user, "Success")

  } catch (error) {
    resp.makeResponsesException(res, error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await mUser.find({ status: 'A' })
    resp.makeResponsesOkData(res, users, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })
      .populate({ path: 'idRole', select: 'name' })
    resp.makeResponsesOkData(res, user, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })
    const data = {
      idRole: req.body.idRole,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      photo: req.body.photo,
      address: req.body.address,
      phone: req.body.phone,
      biography: req.body.biography,
      birthday: req.body.birthday
    }

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {

      const saveUser = await mUser.findByIdAndUpdate(req.params.id, data)

      resp.makeResponsesOkData(res, saveUser, "UUpdated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const saveUser = await user.updateOne({
      _id: req.params.id,
      status: 'I'
    }, {
      $set: {
        deletedAt: Date.now()
      }
    })

    resp.makeResponsesOkData(res, saveUser, "UDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

/**
 * Actions for books
 */

const setUserBook = async (req, res) => {
  try {

    const value = req.body

    if (!await mUser.findOne({ _id: req.params.id, status: 'A' })) {

      return resp.makeResponsesError(res, "UNotFound")

    } else if (await mUserBook.findOne({ idUser: req.params.id, idBook: value.idBook })) {

      const saveUserBook = await mUserBook.findOneAndUpdate({ idUser: req.params.id, idBook: value.idBook }, {
        $set: {
          favourite: value.favourite,
          status: value.status
        }
      })

      resp.makeResponsesOkData(res, saveUserBook, "Success")

    } else {

      const userBook = new mUserBook({
        idUser: req.params.id,
        idBook: value.idBook,
        favourite: value.favourite,
        status: value.status
      })

      const saveUserBook = await userBook.save()
      resp.makeResponsesOkData(res, saveUserBook, "Success")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getFavouritesBooksByUser = async (req, res) => {
  try {

    if (!await mUser.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {

      const books = await mUserBook.find({ idUser: req.params.id, favourite: true })
      resp.makeResponsesOkData(res, books, "Success")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getToReadBooksByUser = async (req, res) => {
  try {

    if (!await mUser.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {

      const books = await mUserBook.find({ idUser: req.params.id, status: 'T' })
      resp.makeResponsesOkData(res, books, "Success")

    }
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReadingBooksByUser = async (req, res) => {
  try {

    if (!await mUser.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {

      const books = await mUserBook.find({ idUser: req.params.id, status: 'R' })
      resp.makeResponsesOkData(res, books, "Success")

    }
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReadBooksByUser = async (req, res) => {
  try {

    if (!await mUser.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {

      const books = await mUserBook.find({ idUser: req.params.id, status: 'D' })
      resp.makeResponsesOkData(res, books, "Success")

    }
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

/**
 * Books actions
 */

const getFavouriteBookUsersByBook = async (req, res) => {
  try {

    const book = await mUserBook.find({ idBook: req.params.id, favourite: true })
    resp.makeResponsesOkData(res, book, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getToReadBookUsersByBook = async (req, res) => {
  try {

    const book = await mUserBook.find({ idBook: req.params.id, status: 'T' })
    resp.makeResponsesOkData(res, book, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReadingBookUsersByBook = async (req, res) => {
  try {

    const book = await mUserBook.find({ idBook: req.params.id, status: 'R' })
    resp.makeResponsesOkData(res, book, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReadBookUsersByBook = async (req, res) => {
  try {

    const book = await mUserBook.find({ idBook: req.params.id, status: 'D' })
    resp.makeResponsesOkData(res, book, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

/**
 * Personal Preferences actions
 */

const setPersonalPreference = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {
      const personalPreference = new mPersonalPreference({
        idUser: req.params.id,
        genres: req.body
      })
      const savePersonalPrefenreces = await personalPreference.save()

      resp.makeResponsesOkData(res, savePersonalPrefenreces, "PPreferenceCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getPersonalPreference = async (req, res) => {
  try {

    const user = await mPersonalPreference.find({ idUser: req.params.id })
      .populate({ path: 'idUser', select: 'firstName lastName email' })
      .populate({ path: 'genres', select: 'name' })
    resp.makeResponsesOkData(res, user, "PPreferenceGet")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getUserByPersonalPreference = async (req, res) => {
  try {

    const genre = await mPersonalPreference.find({ idLiteraryGenre: req.params.id })
      .populate({ path: 'idUser', select: 'firstName lastName email' })
      .populate({ path: 'genres', select: 'name' })
    resp.makeResponsesOkData(res, genre, "UGetByPersonalPreference")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updatePersonalPreference = async (req, res) => {

  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {
      const personalPreference = await mPersonalPreference.findOneAndUpdate({ idUser: req.params.id }, {
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

      resp.makeResponsesOkData(res, personalPreference, "PPreferenceUpdated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setReactionPost = async (req, res) => {
  try {
    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })
    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mReactionPost.findOne({ idUser: req.params.id, idPost: req.body.idPost, reacted: true })) {
      const saveReactionFalse = await mReactionPost.updateOne({
        reacted: false,
      })
      resp.makeResponsesOkData(res, saveReactionFalse, "ReactionFalse")
    } else if (await mReactionPost.findOne({ idUser: req.params.id, idPost: req.body.idPost, reacted: false })) {
      const saveReactionTrue = await mReactionPost.updateOne({
        reacted: true,
      })
      resp.makeResponsesOkData(res, saveReactionTrue, "ReactionTrue")
    } else {
      const reaction = new mReactionPost({
        idUser: req.params.id,
        idPost: req.body.idPost,
      })
      const savePersonalPrefenreces = await reaction.save()

      resp.makeResponsesOkData(res, savePersonalPrefenreces, "ReactionCreated")

    }
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReactionPostUsersByPost = async (req, res) => {
  try {
    const reactions = await mReactionPost.find({ idPost: req.params.id })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setReactionReview = async (req, res) => {
  try {
    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })
    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mReactionReview.findOne({ idUser: req.params.id, idReview: req.body.idReview, reacted: true })) {
      const saveReactionFalse = await mReactionReview.updateOne({
        reacted: false,
      })
      resp.makeResponsesOkData(res, saveReactionFalse, "ReactionFalse")
    } else if (await mReactionReview.findOne({ idUser: req.params.id, idReview: req.body.idReview, reacted: false })) {
      const saveReactionTrue = await mReactionReview.updateOne({
        reacted: true,
      })
      resp.makeResponsesOkData(res, saveReactionTrue, "ReactionTrue")
    } else {
      const reaction = new mReactionmReactionReviewPost({
        idUser: req.params.id,
        idReview: req.body.idReview,
      })
      const savePersonalPrefenreces = await reaction.save()

      resp.makeResponsesOkData(res, savePersonalPrefenreces, "ReactionCreated")

    }
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getReactionReviewUsersByReview = async (req, res) => {
  try {
    const reactions = await mReactionReview.find({ idReview: req.params.id })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}



module.exports = {
  // Users
  createUser,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,

  // Actions for books
  setUserBook,
  getFavouritesBooksByUser,
  getToReadBooksByUser,
  getReadingBooksByUser,
  getReadBooksByUser,

  // Books actions
  getFavouriteBookUsersByBook,
  getToReadBookUsersByBook,
  getReadingBookUsersByBook,
  getReadBookUsersByBook,

  // Preference actions
  setPersonalPreference,
  getPersonalPreference,
  getUserByPersonalPreference,
  updatePersonalPreference,

  // User reactions post actions
  setReactionPost,

  // Reactions post actions
  getReactionPostUsersByPost,

  // User reactions review actions
  setReactionReview,

  // Reactions review actions
  getReactionReviewUsersByReview,


}
