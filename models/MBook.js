const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const bookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'Id of the user creator is required'],
  },
  name: {
    type: String,
    required: [true, 'Name of the book is required'],
    minlength: [1, 'Name of the book must be at least 1 character'],
    maxlength: [525, 'Name of the book must be at most 525 characters'],
  },
  synopsis: {
    type: String,
    required: [true, 'Synopsis of the book is required'],
    minlength: [1, 'Synopsis of the book must be at least 1 character'],
    maxlength: [1024, 'Synopsis of the book must be at most 1024 characters'],
  },
  photo: {
    type: String,
    required: [true, 'Photo of the book is required'],
    minlength: [1, 'Photo of the book must be at least 1 character'],
    maxlength: [1024, 'Photo of the book must be at most 1024 characters'],
  },
  document: {
    type: String,
    required: true,
    minlength: [1, 'Document of the book must be at least 1 character'],
    maxlength: [1024, 'Document of the book must be at most 1024 characters'],
  },
  creationDate: {
    type: Date,
    required: [true, 'Creation date of the book is required'],
  },
  status: {
    type: String,
    required: [true, 'Status of the book is required'],
    minlength: [1, 'Status of the book must be at least 1 character'],
    maxlength: [1, 'Status of the book must be at most 1 character'],
    enum: {
      values: ['A', 'I'], // A = Active, I = Inactive
      message: '{VALUE} is not a valid status',
    },
    default: 'A',

  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
}, { timestamps: true })

bookSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MBook', bookSchema)