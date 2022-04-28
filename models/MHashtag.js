const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hashtagSchema = new Schema({
  name: {
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

module.exports = mongoose.model('MHashtag', hashtagSchema)