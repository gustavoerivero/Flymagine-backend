const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reactionPostSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: ['Es necesario que ingrese el id de usuario'],
  }],
  idPost: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: ['Es necesario que ingrese el id de post'],
    unique: true
  }
}, { timestamps: true })

module.exports = mongoose.model('MReactionPost', reactionPostSchema)