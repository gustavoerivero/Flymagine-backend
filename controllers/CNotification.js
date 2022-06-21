const mNotification = require('../models/MNotification')
const resp = require('../utils/responses')

const createNotification = async (req, res) => {
  try {
    const value = req.body

    const notification = new mNotification({
      user: value.user,
      description: value.description,
      type: value.type,
    })

    const saveNotification = await notification.save()

    resp.makeResponsesOkData(res, saveNotification, "NCreated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllNotification = async (req, res) => {
  try {
    const notifications = await mNotification.find({ status: 'A' })
    resp.makeResponsesOkData(res, notifications, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getNotificationByUser = async (req, res) => {
  try {
    const notification = await mNotification.find({ user: req.params.id, status: 'A' })
    resp.makeResponsesOkData(res, notification, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getNotificationById = async (req, res) => {
  try {
    const notification = await mNotification.findOne({ _id: req.params.id, status: 'A' })
    resp.makeResponsesOkData(res, notification, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateNotification = async (req, res) => {
  try {
    const value = req.body

    const notification = await mNotification.findById(req.params.id)

    if (!notification) {
      return resp.makeResponsesError(res, "NNotFound")
    }

    const saveNotification = await mNotification.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        description: value.description,
      }
    })

    resp.makeResponsesOkData(res, saveNotification, "NUpdated")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteNotification = async (req, res) => {
  try {

    const notification = await mNotification.findById(req.params.id)

    if (!notification) {
      return resp.makeResponsesError(res, "NNotFound")
    }

    const saveNotification = await mNotification.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, saveNotification, "NDeleted")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const readNotification = async (req, res) => {
  try {

    const notification = await mNotification.findOne({ _id: req.params.id, status: 'A' })

    if (!notification) {
      return resp.makeResponsesError(res, "NNotFound")
    }

    const saveNotification = await mNotification.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        isRead: true,
      }
    })

    resp.makeResponsesOkData(res, saveNotification, "Success")

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
  readNotification
}