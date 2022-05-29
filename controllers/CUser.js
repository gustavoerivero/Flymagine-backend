// User imports
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mUser = require('../models/MUser')
const emails = require('../utils/emails')
const resp = require('../utils/responses')
const validate = require('../utils/validate')
var generator = require('generate-password');

// Follows imports
const mFollows = require('../models/MFollows')

// UserBooks imports
const mUserBookFav = require('../models/MUserBookFav')
const mUserBookToRead = require('../models/MUserBookToRead')
const mUserBookReading = require('../models/MUserBookReading')
const mUserBookRead = require('../models/MUserBookRead')

// PersonalPreference imports
const mPersonalPreference = require('../models/MPersonalPreference')

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
        fullName: value.firstName + ' ' + value.lastName,
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
      fullName: valUser.fullName,
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
      .sort({ createdAt: -1 })
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

const getOnlyUser = async (req, res) => {
  try {
    const user = await mUser.findOne({
      _id: req.params.id,
      status: 'A'
    })
      .sort({ createdAt: -1 })

    resp.makeResponsesOkData(res, user, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getFilterUsers = async (req, res) => {
  try {

    const users = await mUser.find({
      $or: [
        { fullName: { $regex: req.params.search } },
      ],
      status: 'A'
    })
      .populate({ path: 'idRole', select: 'name' })
      .limit(10)
      .sort({ createdAt: -1 })

    resp.makeResponsesOkData(res, users, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getFilterUsersNoLimits = async (req, res) => {
  try {

    const users = await mUser.find({
      $or: [
        { fullName: { $regex: req.params.search } },
      ],
      status: 'A'
    })
      .populate({ path: 'idRole', select: 'name' })
      .sort({ createdAt: -1 })
    resp.makeResponsesOkData(res, users, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const uploadProfileImage = async (req, res) => {
  try {

    if (!await mUser.findOne({ _id: req.params.id, status: 'A' })) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const file = req?.file
    if (!file) {
      return resp.makeResponsesError(res, "UImageError")
    }

    const filename = file?.filename
    const basePath = `${req.protocol}://${req.get('host')}/flymagine/public/images/`

    const saveUser = await mUser.findOneAndUpdate({
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

const updateUser = async (req, res) => {
  try {
    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {

      let firstName = req.body.firstName ? req.body.firstName : user.firstName
      let lastName = req.body.lastName ? req.body.lastName : user.lastName
      let fullName = firstName + ' ' + lastName

      const saveUser = await mUser.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
        $set: {
          firstName: firstName,
          lastName: lastName,
          fullName: fullName,
          address: req.body.address ? req.body.address : user.address,
          phone: req.body.phone ? req.body.phone : user.phone,
          biography: req.body.biography ? req.body.biography : user.biography,
        }
      })

      resp.makeResponsesOkData(res, saveUser, "UUpdated")

    }

  } catch (error) {

    console.log(error)
    console.log('this is a error')
    resp.makeResponsesException(res, error)
  }
}

const changePassword = async (req, res) => {
  try {

    const valUser = await mUser.findOne({
      _id: req.params.id,
      email: req.body.email,
      status: 'A'
    })

    if (!valUser) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const valPass = await validate.comparePassword(req.body.password, valUser.password)

    if (!valPass) {
      return resp.makeResponsesError(res, "UChangePasswordError")
    }

    const valNewPass = await validate.comparePassword(req.body.newPassword, valUser.password)

    if (valNewPass) {
      return resp.makeResponsesError(res, "UChangePasswordError1")
    }

    const saveUser = await mUser.findOneAndUpdate({
      _id: valUser._id,
      status: 'A'
    }, {
      $set: {
        password: bcrypt.hashSync(req.body.newPassword)
      }
    })

    resp.makeResponsesOkData(res, saveUser, "UChangePasswordSuccess")

  } catch (error) {
    resp.makeResponsesError(res, error)
    console.log('error', error)
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

const restoredPassword = async (req, res) => {
  try {
    const user = await mUser.findOne({ email: req.params.email, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    let newPassword = generator.generate({
      length: 9,
      numbers: true,
      lowercase: true,
      uppercase: true,
    }) + '12*'

    const updateUser = await mUser.findOneAndUpdate({
      email: req.params.email,
      status: 'A'
    }, {
      $set: {
        password: bcrypt.hashSync(newPassword)
      }
    })

    let _resp = emails.sendEmail(req.params.email, newPassword)

    resp.makeResponsesOkData(res, updateUser, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}
/**
 * 
 * UserFollows actions
 */

const setFollowUser = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mFollows.findOne({ idUser: req.params.id })) {

      const updateFollows = await mFollows.findOneAndUpdate({
        idUser: req.params.id
      }, {
        $set: {
          follows: req.body
        }
      })

      resp.makeResponsesOkData(res, updateFollows, "Success")

    } else {

      const follows = await mFollows.create({
        idUser: req.params.id,
        follows: req.body
      })
      const saveFollows = follows.save()

      resp.makeResponsesOkData(res, saveFollows, "Success")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getFollows = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (!await mFollows.findOne({ idUser: req.params.id })) {

      const follows = await mFollows.create({
        idUser: req.params.id,
        follows: []
      })

      const saveFollows = follows.save()

      resp.makeResponsesOkData(res, saveFollows, "Success")

    } else {

      const follows = await mFollows.findOne({ idUser: req.params.id })
        .populate({ path: 'idUser', select: 'firstName lastName' })
        .populate({ path: 'follows' })
        .sort({ createdAt: -1 })

      resp.makeResponsesOkData(res, follows, "Success")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getFollowers = async (req, res) => {
  try {
    const followers = await mFollows.find({
      follows: req.params.id,
      idUser: {
        $nin: req.params.id
      }
    })
      .populate({ path: 'idUser' })
      .sort({ createdAt: -1 })

    resp.makeResponsesOkData(res, followers, 'Success')

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

/**
 * Actions to users for books
 */

const setUserBookFav = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mUserBookFav.findOne({ idUser: req.params.id })) {
      const updateBookFav = await mUserBookFav.findOneAndUpdate({ idUser: req.params.id }, {
        $set: {
          booksFav: req.body
        }
      })
      resp.makeResponsesOkData(res, updateBookFav, "Success")

    } else {
      const bookFav = new mUserBookFav({
        idUser: req.params.id,
        booksFav: req.body
      })
      const saveBookFav = await bookFav.save()

      resp.makeResponsesOkData(res, saveBookFav, "UBookFavCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}
const setUserBookToRead = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mUserBookToRead.findOne({ idUser: req.params.id })) {
      const updateBookToRead = await mUserBookToRead.findOneAndUpdate({ idUser: req.params.id }, {
        $set: {
          booksToRead: req.body
        }
      })
      resp.makeResponsesOkData(res, updateBookToRead, "Success")

    } else {
      const bookToRead = new mUserBookToRead({
        idUser: req.params.id,
        booksToRead: req.body
      })
      const saveBookToRead = await bookToRead.save()

      resp.makeResponsesOkData(res, saveBookToRead, "UBookToReadCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setUserBookReading = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mUserBookReading.findOne({ idUser: req.params.id })) {
      const updateBookReading = await mUserBookReading.findOneAndUpdate({ idUser: req.params.id }, {
        $set: {
          booksReading: req.body
        }
      })
      resp.makeResponsesOkData(res, updateBookReading, "Success")

    } else {
      const bookReading = new mUserBookReading({
        idUser: req.params.id,
        booksReading: req.body
      })
      const saveBookReading = await bookReading.save()

      resp.makeResponsesOkData(res, saveBookReading, "UBookReadingCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const setUserBookRead = async (req, res) => {
  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else if (await mUserBookRead.findOne({ idUser: req.params.id })) {
      const updateBookRead = await mUserBookRead.findOneAndUpdate({ idUser: req.params.id }, {
        $set: {
          booksRead: req.body
        }
      })
      resp.makeResponsesOkData(res, updateBookRead, "Success")

    } else {
      const bookRead = new mUserBookRead({
        idUser: req.params.id,
        booksRead: req.body
      })
      const saveBookRead = await bookRead.save()

      resp.makeResponsesOkData(res, saveBookRead, "UBookReadCreated")

    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksFavByUser = async (req, res) => {
  try {
    const reactions = await mUserBookFav.find({ idUser: req.params.id, status: 'A' })
      .populate('booksFav')
      .populate('idUser')
      .sort({ createdAt: -1 })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksToReadByUser = async (req, res) => {
  try {
    const reactions = await mUserBookToRead.find({ idUser: req.params.id, status: 'A' })
      .populate('booksToRead')
      .populate('idUser')
      .sort({ createdAt: -1 })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksReadingByUser = async (req, res) => {
  try {
    const reactions = await mUserBookReading.find({ idUser: req.params.id, status: 'A' })
      .populate('booksReading')
      .populate('idUser')
      .sort({ createdAt: -1 })
    resp.makeResponsesOkData(res, reactions, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getBooksReadByUser = async (req, res) => {
  try {
    const reactions = await mUserBookRead.find({ idUser: req.params.id, status: 'A' })
      .populate('booksRead')
      .populate('idUser')
      .sort({ createdAt: -1 })
    resp.makeResponsesOkData(res, reactions, "Success")
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
    }
    else if (await mPersonalPreference.findOne({ idUser: req.params.id })) {
      const personalPreference = await mPersonalPreference.updateOne({ idUser: req.params.id }, {
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
      .populate('genres')
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

const deleteAllPersonalPreference = async (req, res) => {

  try {

    const user = await mUser.findOne({ _id: req.params.id, status: 'A' })

    if (!user) {
      return resp.makeResponsesError(res, "UNotFound")
    } else {
      const personalPreference = await mPersonalPreference.findOneAndUpdate({ idUser: req.params.id }, {
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

      resp.makeResponsesOkData(res, personalPreference, "PPreferenceUpdated")

    }

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
  getOnlyUser,
  getFilterUsers,
  getFilterUsersNoLimits,
  updateUser,
  changePassword,
  uploadProfileImage,
  deleteUser,
  restoredPassword,

  // Follows actions
  setFollowUser,
  getFollows,
  getFollowers,

  // Actions for books
  setUserBookFav,
  setUserBookToRead,
  setUserBookReading,
  setUserBookRead,
  getBooksFavByUser,
  getBooksToReadByUser,
  getBooksReadingByUser,
  getBooksReadByUser,

  // Preference actions
  setPersonalPreference,
  getPersonalPreference,
  getUserByPersonalPreference,
  deleteAllPersonalPreference,

}
