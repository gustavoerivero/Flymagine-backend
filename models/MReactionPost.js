const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const reactionPostSchema = new Schema({  
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: [true, 'Post id is required'],
    unique: [true, 'Post id must be unique'],
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User ids is required'],
  }]
}, { timestamps: true })

reactionPostSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MReactionPost', reactionPostSchema)