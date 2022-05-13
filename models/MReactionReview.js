const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reactionReviewSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: ['Es necesario que ingrese el id de usuario'],
  }],
  idReview: {
    type: Schema.Types.ObjectId,
    ref: 'MReview',
    required: ['Es necesario que ingrese el id de review'],
  }
}, { timestamps: true })

module.exports = mongoose.model('MReactionReview', reactionReviewSchema)