const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  postDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    required: true,
    maxlength: 1,
    default: 'A' // A = Active, I = Inactive
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('MPost', postSchema)