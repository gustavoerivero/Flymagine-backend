const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name must be unique'],
    minlength: [1, 'Name must be at least 1 character'],
    maxlength: [255, 'Name must be less than 255 characters'],
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
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
}, { timestamps: true })

roleSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MRole', roleSchema)

