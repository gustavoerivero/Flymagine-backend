const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const postTagSchema = new Schema({
  hashtags: [{
    type: Schema.Types.ObjectId,
    ref: 'MHashtag',
    required: [true, 'Hashtag ids are required'],
  }],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: [true, 'Post id is required'],
  },
}, { timestamps: true })

postTagSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MPostTag', postTagSchema)