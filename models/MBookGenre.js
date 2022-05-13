const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookGenreSchema = new Schema({
  idBook: {
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: ['Es necesario que ingrese el id de libro'],
    unique: true
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'MLiteraryGenre',
    required: ['Es necesario el id del género literario'],
  }]
}, { timestamps: true })

module.exports = mongoose.model('MBookGenre', bookGenreSchema)