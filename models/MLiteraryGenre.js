const mongoose = require('mongoose')
const Schema = mongoose.Schema

const literaryGenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
  status: {
    type: String,
    maxlength: 1,
    default: 'A', // A = Active, I = Inactive
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MLiteraryGenre', literaryGenreSchema)