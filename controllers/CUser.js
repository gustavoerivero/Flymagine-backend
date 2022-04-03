const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mUser = require('../models/MUser')
const resp = require('../utils/responses')
const validate = require('../utils/validate')

async function createUser(req, res) {
  try {
    const value = req.body

    const valUser = await mUser.findOne({
      email: value.email
    })

    if (valUser) {
      resp.makeResponsesError(res, "UFound")
    }

    const user = new mUser({
      idRole: value.idRole,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      password: bcrypt.hashSync(value.password, 8),
      photo: value.photo,
      address: valUser.address,
      phone: valUser.phone,
      birthday: valUser.birthday, 
    })

    const saveUser = await user.save()

    resp.makeResponsesOkData(res, saveUser, "UCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

async function login(req, res) {
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
      idRole: valUser.idRole,
      firstName: valUser.name,
      lastName: valUser.lastName,      
      email: valUser.email,
      photo: valUser.photo,
      address: valUser.address,
      phone: valUser.phone,
      birthday: valUser.birthday,      
      token: token
    }

    resp.makeResponsesOkData(res, user, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await mUser.find()
    resp.makeResponsesOkData(res, users, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

async function getUser(req, res) {
  try {
    const user = await mUser.findOne({_id: req.params.id})
    resp.makeResponsesOkData(res, user, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

async function updateUser(req, res) {
  try {
    const user = await mUser.findOne({_id: req.params.id})
    const data = req.body

    if(!user) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const saveUser = await user.updateOne({
      _id: req.params.id,
    }, {
      $set: data
    })

    resp.makeResponsesOkData(res, updateUser, "UUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

async function deleteUser(req, res) {
  try {
    const user = await mUser.findOne({_id: req.params.id})

    if(!user) {
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
