const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10, // Writter, Reader, ...
  },
  deletedAt: {
    type: Date,
    required: false, 
    default: null,
  },
  status: {
    type: String,
    maxlength: 1,
    default: 'A', // A = Active, I = Inactive
    required: false,
  }
}, { timestamps: true })

module.exports = mongoose.model('MRole', roleSchema)

