const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'Review must belong to a user'],
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: [true, 'Review must belong to a book'],
  },
  description: {
    type: String,
    required: [true, 'Review must have a description'],
    minLength: [1, 'Review must have at least 1 character'],
    maxlength: [1024, 'Review description must be less than 1024 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Review must have a rating'],
    min: [1, 'Review rating must be at least 1'],
    max: [5, 'Review rating must be at most 5'],
  },
  status: {
    type: String,
    required: [true, 'Review must have a status'],
    minlength: [1, 'Review status must be at least 1 character'],
    maxlength: [1, 'Review status must be at most 1 character'],
    enum: {
      values: ['A', 'I'], // A = Active, I = Inactive
      message: '{VALUE} is not a valid status',
    },
    default: 'A'
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

reviewSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MReview', reviewSchema)