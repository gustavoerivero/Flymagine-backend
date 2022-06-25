const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userBookReadingScheme = new Schema({
  booksReading: [{
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: [true, 'Book ids are required'],
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
  },
}, { timestamps: true })

userBookReadingScheme.plugin(mongoosePaginate)
module.exports = mongoose.model('MUserBookReading', userBookReadingScheme)