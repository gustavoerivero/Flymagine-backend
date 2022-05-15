const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoPostSchema = new Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    ref: 'MPost',
    required: true
  },
  photos: [
    {
      type: String,
      required: true,
      maxlength: 1024,
    },
  ],
}, { timestamps: true })

module.exports = mongoose.model('MPhotoPost', photoPostSchema)