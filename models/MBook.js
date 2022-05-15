const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  sypnosis: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  photo: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  document: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  postDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  creationDate: {
    type: Date,
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

module.exports = mongoose.model('MBook', bookSchema)