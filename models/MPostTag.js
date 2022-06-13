const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postTagSchema = new Schema({
  hashtags: [{
    type: Schema.Types.ObjectId,
    ref: 'MHashtag',
    required: true,
  }],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MPostTag', postTagSchema)