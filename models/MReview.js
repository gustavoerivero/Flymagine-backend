const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
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
  description: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    maxlength: 1,
  },
  status: {
    type: String,
    default: 'A', // A = Active, I = Inactive
    required: true,
    maxlength: 1,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

module.exports = mongoose.model('MReview', reviewSchema)