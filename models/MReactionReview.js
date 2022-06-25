const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const reactionReviewSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
  }],
  review: {
    type: Schema.Types.ObjectId,
    ref: 'MReview',
    required: [true, 'Review id is required'],
  }
}, { timestamps: true })

reactionReviewSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MReactionReview', reactionReviewSchema)