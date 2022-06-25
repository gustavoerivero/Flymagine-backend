const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

// This is the hashtag Schema
const hashtagSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Hashtag name is required'],
    minLength: [1, 'The name must be at least 1 character long'],
    maxlength: [255, 'The name of the hashtag must be less than 255 characters'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    minLength: [1, 'The status must be at least 1 character long'],
    maxlength: [1, 'The status must be at most 1 character long'],
    enum: {
      values: ['A', 'I'], // A = Active, I = Inactive
      message: '{VALUE} is not a valid status',
    }, 
    default: 'A'
  },
  deleteAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

hashtagSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MHashtag', hashtagSchema)