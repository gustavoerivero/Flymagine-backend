const mongoose = require('mongoose')
const Schema = mongoose.Schema

// This is the hashtag Schema
const hashtagSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
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

module.exports = mongoose.model('MHashtag', hashtagSchema)