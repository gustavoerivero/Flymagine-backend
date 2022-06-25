const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const followsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
  },
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MUser',
      required: [true, 'Follow user id is required'],
    },
  ],
}, { timestamps: true })

followsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MFollows', followsSchema)