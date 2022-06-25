const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const bookGenreSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: [true, 'Book id is required'],
    unique: [true, 'Book id must be unique'],
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'MLiteraryGenre',
    required: [true, 'Genre ids are required'],
  }]
}, { timestamps: true })

bookGenreSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MBookGenre', bookGenreSchema)