const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBookReadingScheme = new Schema({
  booksReading: [{
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: true,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MUserBookReading', userBookReadingScheme)