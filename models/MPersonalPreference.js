const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personalPreferenceSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: ['Es necesario que ingrese el id de usuario'],
    unique: true,
  },
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MLiteraryGenre',
      required: ['Es necesario el id del género literario'],
    },
  ]
}, { timestamps: true })

module.exports = mongoose.model('MPersonalPreference', personalPreferenceSchema)