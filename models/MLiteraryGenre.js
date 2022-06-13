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
    required: true,
    maxlength: 1,
    enum: ['A', 'I'], // A = Active, I = Inactive
    default: 'A'
  },
}, { timestamps: true })

module.exports = mongoose.model('MLiteraryGenre', literaryGenreSchema)