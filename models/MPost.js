const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [1, 'Description must be at least 1 character'],
    maxlength: [1024, 'Description must be less than 1024 characters'],
  },
  photo: {
    type: String,
    required: [true, 'Photo is required'],
    minlength: [1, 'Photo must be at least 1 character'],
    maxlength: [1024, 'Photo must be less than 1024 characters'],
    default: 'none',
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    minlength: [1, 'Status must be at least 1 character'],
    maxlength: [1, 'Status must be at most 1 character'],
    enum: {
      values: ['A', 'I'], // A = Active, I = Inactive
      message: '{VALUE} is not a valid status',
    },
    default: 'A'
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

postSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MPost', postSchema)