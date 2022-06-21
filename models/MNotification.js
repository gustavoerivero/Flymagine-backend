const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  type: {
    type: String,
    required: true,
    maxlength: 2,
    enum: [
      'BO', // Book
      'CP', // Comment Post
      'CR', // Comment Review
      'LP', // Like Post
      'LR', // Like Review
      'LC', // Like Comment
      'FU'  // Follow User
    ]
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
    maxlength: 1,
    enum: ['A', 'I'], // A = Active, I = Inactive
    default: 'A'
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

module.exports = mongoose.model('MNotification', notificationSchema)