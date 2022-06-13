const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  synopsis: {
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
  creationDate: {
    type: Date,
    required: true,
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

module.exports = mongoose.model('MBook', bookSchema)