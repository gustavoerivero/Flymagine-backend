const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentReviewSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  idReview: {
    type: Schema.Types.ObjectId,
    ref: 'MReview',
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  commentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  usersLiked: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser'
  }],
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

module.exports = mongoose.model('MCommentReview', commentReviewSchema)