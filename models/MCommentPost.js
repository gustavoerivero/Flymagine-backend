const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentPostSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
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
  deleteAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('MCommentPost', commentPostSchema)