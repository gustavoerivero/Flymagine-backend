const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTagSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  }],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MUserTag', userTagSchema)