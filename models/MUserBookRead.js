const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBookReadScheme = new Schema({
  booksRead: [{
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: true,
  }],
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MUserBookRead', userBookReadScheme)