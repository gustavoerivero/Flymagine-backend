const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  idRole: {
    type: Schema.Types.ObjectId,
    ref: 'MRole',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 40,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 60,
  },
  photo: {
    type: String,
    required: true,
    maxlength: 1024,
    default: 'none',
  },
  address: {
    type: String,
    required: false,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: false,
    maxlength: 20,
  },
  birthday: {
    type: Date,
    required: false,
  },
  biography: {
    type: String,
    required: false,
    maxlength: 1024,
  },
  lastConnection: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  status: {
    type: String,
    default: 'A', // A = Active, I = Inactive
    maxlength: 1,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  }
}, { timestamps: true })

module.exports = mongoose.model('MUser', userSchema)