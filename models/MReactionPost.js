const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reactionPostSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  idPost: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true,
  },
  reacted:{
    type: Boolean,
    default: true,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('MReactionPost', reactionPostSchema)