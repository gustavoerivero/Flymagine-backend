const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userTagSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User ids are required'],
  }],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: [true, 'Post id is required'],
  },
}, { timestamps: true })

userTagSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MUserTag', userTagSchema)