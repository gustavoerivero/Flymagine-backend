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
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 16,
  },
  photo: {
    type: String,
    required: true,
    maxlength: 255,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastConnection: {
    type: Date,
    required: false,
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
    required: true,
  },
  deletedAt: {
    type: Date,
  },
  status: {
    type: String,
    default: 'A',
    maxlength: 1,
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MUser', userSchema)