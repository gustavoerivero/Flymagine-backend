const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookGenreSchema = new Schema({
  idBook: {
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: true,
  },
  idLiteraryGenre: {
    type: Schema.Types.ObjectId,
    ref: 'MLiteraryGenre',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MBookGenre', bookGenreSchema)