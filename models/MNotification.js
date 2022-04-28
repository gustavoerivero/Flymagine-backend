const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  notificationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false, // false = not read, true = read
    required: true,
  },
  status: {
    type: String,
    default: 'A', // A = Active, I = Inactive
    required: true,
    maxlength: 1,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

module.exports = mongoose.model('MNotification', notificationSchema)