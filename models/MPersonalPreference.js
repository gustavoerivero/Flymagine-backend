const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const personalPreferenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: [true, 'User id is required'],
    unique: [true, 'User id must be unique'],
  },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MLiteraryGenre',
      required: [true, 'Genre ids are required'],
    },
  ]
}, { timestamps: true })

personalPreferenceSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('MPersonalPreference', personalPreferenceSchema)