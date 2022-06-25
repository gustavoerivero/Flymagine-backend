const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userBookReadScheme = new Schema({
  booksRead: [{
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

userBookReadScheme.plugin(mongoosePaginate)
module.exports = mongoose.model('MUserBookRead', userBookReadScheme)