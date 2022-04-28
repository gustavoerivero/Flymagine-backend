const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoPostSchema = new Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true
  },
  photo: {
    type: String,
    required: true,
    maxlength: 255
  },
  deleteAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

module.exports = mongoose.model('MPhotoPost', photoPostSchema)