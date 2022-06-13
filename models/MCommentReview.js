const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: 'MReview',
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  usersLiked: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser'
  }],
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

module.exports = mongoose.model('MCommentReview', commentReviewSchema)