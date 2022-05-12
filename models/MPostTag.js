const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postTagSchema = new Schema({
  idHashtag: {
    type: Schema.Types.ObjectId,
    ref: 'MHashtag',
    required: true,
  },
  idPost: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MPostTag', postTagSchema)