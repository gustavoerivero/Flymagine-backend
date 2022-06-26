const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = Schema({
  role: {
    type: Schema.Types.ObjectId,
    ref: 'MRole',
    required: [true, 'Role is required'],
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [1, 'First name must be at least 1 character'],
    maxlength: [255, 'First name must be less than 255 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [1, 'Last name must be at least 1 character'],
    maxlength: [255, 'Last name must be less than 255 characters'],
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    minlength: [1, 'Full name must be at least 1 character'],
    maxlength: [525, 'Full name must be less than 525 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: [1, 'Email must be at least 1 character'],
    maxlength: [255, 'Email must be less than 255 characters'],
    unique: [true, 'Email must be unique'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    maxlength: [16, 'Password must be less than 16 characters'],
  },
  photo: {
    type: String,
    required: [true, 'Photo is required'],
    minlength: [1, 'Photo must be at least 1 character'],
    maxlength: [1024, 'Photo must be less than 1024 characters'],
    default: 'none',
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [1, 'Address must be at least 1 character'],
    maxlength: [1024, 'Address must be less than 1024 characters'],
  },
  phone: {
    type: String,
    required: false,
    minlength: [1, 'Phone must be at least 1 character'],
    maxlength: [20, 'Phone must be less than 20 characters'],
  },
  birthday: {
    type: Date,
    required: false,
  },
  biography: {
    type: String,
    required: false,
    minlength: [1, 'Biography must be at least 1 character'],
    maxlength: [1024, 'Biography must be less than 1024 characters'],
  },
  tokens: [{
    token: {
      type: String,
      minlength: [1, 'Token must be at least 1 character'],
      maxlength: [1024, 'Token must be less than 1024 characters'],
      unique: [true, 'Token must be unique'],
      required: false
    },
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
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  }
}, { timestamps: true })

userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MUser', userSchema)