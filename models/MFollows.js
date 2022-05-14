const mongoose = require('mongoose')
const Schema = mongoose.Schema

const followsSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MUser',
      required: true,
    },
  ],
}, { timestamps: true })

module.exports = mongoose.model('MFollows', followsSchema)