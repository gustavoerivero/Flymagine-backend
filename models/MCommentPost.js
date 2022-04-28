const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentPostSchema = new Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true
  },
  commentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  status: {
    type: String,
    required: true,
    maxlength: 1,
    default: 'A' // A = Active, I = Inactive
  },
  deleteAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('MCommentPost', commentPostSchema)