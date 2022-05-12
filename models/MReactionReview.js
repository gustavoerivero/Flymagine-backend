const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reactionReviewSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  idReview: {
    type: Schema.Types.ObjectId,
    ref: 'MReview',
    required: true,
  },
  reacted:{
    type: Boolean,
    default: true,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.model('MReactionReview', reactionReviewSchema)