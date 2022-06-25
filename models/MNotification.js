const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const notificationSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minLength: [1, 'Description must be at least 1 character'],
    maxlength: [1024, 'Description must be less than 1024 characters'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    minLength: [2, 'Type must be at least 2 characters'],
    maxlength: [2, 'Type must be less than 2 characters'],
    enum: {
      values: [
        'BO', // Book
        'CP', // Comment Post
        'CR', // Comment Review
        'LP', // Like Post
        'LR', // Like Review
        'LC', // Like Comment
        'FU'  // Follow User
      ],
      message: '{VALUE} is not a valid type',
    },
  },
  isRead: {
    type: Boolean,
    required: [true, 'Is read is required'],
    default: false,
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    minLength: [1, 'Status must be at least 1 character'],
    maxlength: [1, 'Status must be at most 1 character'],
    enum: { 
      values: ['A', 'I'], // A = Active, I = Inactive
      message: '{VALUE} is not a valid status',
    },
    default: 'A'
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

notificationSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MNotification', notificationSchema)