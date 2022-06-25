const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const commentPostSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: [true, 'Post id is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [1, 'Description of the post must be at least 1 character'],
    maxlength: [1024, 'Description of the post must be less than 1024 characters'],
  },
  photo: {
    type: String,
    required: [true, 'Photo is required'],
    minlength: [1, 'Photo of the post must be at least 1 character'],
    maxlength: [1024, 'Photo must be less than 1024 characters'],
    default: 'none',
  },
  usersLiked: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser'
  }],
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
  deleteAt: {
    type: Date,
    required: false,
    default: null
  }
}, { timestamps: true })

commentPostSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MCommentPost', commentPostSchema)