const mNotification = require('../models/MNotification')
const resp = require('../utils/responses')

const createNotification = async (req, res) => {
  try {
    const value = req.body

    const notification = new mNotification({
      idUser: value.idUser,
      description: value.description,
    })

    const saveNotification = await notification.save()

    resp.makeResponsesOkData(res, saveNotification, "NCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllNotification = async (req, res) => {
  try {
    const notifications = await mNotification.find()
    resp.makeResponsesOkData(res, notifications, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getNotificationByUser = async (req, res) => {
  try {
    const idUser = req.params.idUser
    const notification = await mNotification.find({idUser: idUser})
    resp.makeResponsesOkData(res, notification, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getNotificationById = async (req, res) => {
  try {
    const idNotification = req.params.idNotification
    const notification = await mNotification.findById(idNotification)
    resp.makeResponsesOkData(res, notification, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateNotification = async (req, res) => {
  try {
    const idNotification = req.params.idNotification
    const value = req.body

    const notification = await mNotification.findById(idNotification)

    if(!notification) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const saveNotification = await notification.updateOne({
      _id: idNotification,
    }, {
      $set: value
    })

    resp.makeResponsesOkData(res, saveNotification, "UUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteNotification = async (req, res) => {
  try {
    const idNotification = req.params.idNotification

    const notification = await mNotification.findById(idNotification)

    if(!notification) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const saveNotification = await notification.updateOne({
      _id: idNotification,
      status: 'I'
    })

    resp.makeResponsesOkData(res, saveNotification, "DDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const readNotification = async (req, res) => {
  try {
    const idNotification = req.params.idNotification

    const notification = await mNotification.findById(idNotification)

    if(!notification) {
      return resp.makeResponsesError(res, "UNotFound")
    }

    const saveNotification = await notification.updateOne({
      _id: idNotification,
      isRead: true
    })

    resp.makeResponsesOkData(res, saveNotification, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteAllNotificationByUser = async (req, res) => {
  try {
    const idUser = req.params.idUser
    const notifications = await mNotification.deleteMany({idUser: idUser})
    resp.makeResponsesOkData(res, notifications, "DDeleted")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createNotification,
  getAllNotification,
  getNotificationByUser,
  getNotificationById,
  updateNotification,
  deleteNotification,
  readNotification,
  deleteAllNotificationByUser
}