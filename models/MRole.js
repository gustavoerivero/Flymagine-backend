const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  deletedAt: {
    type: Date,
  },
  status: {
    type: String,
    maxlength: 1,
    default: 'A',
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('MRole', roleSchema)

