const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBookSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  idBook: {
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: true,
  },
  favourite: {
    type: Boolean,
    default: false, // false = not favourite, true = favourite
    required: true,
  },
  status: {
    type: String,
    default: 'T', // T = To read, R = Reading, D = Read
    required: true,
    maxlength: 1,
  },
  deletedAt: {
    type: Date,
  },
}, { timestamps: true })

module.exports = mongoose.model('MUserBook', userBookSchema)