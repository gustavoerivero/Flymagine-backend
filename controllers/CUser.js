const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mUser = require('../models/MUser')
const resp = require('../utils/responses')
const validate = require('../utils/validate')

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

    const token = jwt.sign(
      {
        id: valUser._id,
      },
      "Flymagine-secret",
      {
        expiresIn: "86400"
      }
    )

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

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}
