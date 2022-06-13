const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  rating: {
    type: Number,
    required: true,
    maxlength: 1,
  },
  status: {
    type: String,
    required: true,
    maxlength: 1,
    enum: ['A', 'I'], // A = Active, I = Inactive
    default: 'A'
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

module.exports = mongoose.model('MReview', reviewSchema)