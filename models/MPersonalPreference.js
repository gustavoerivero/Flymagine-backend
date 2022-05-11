const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personalPreferenceSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
  idLiteraryGenre: {
    type: Schema.Types.ObjectId,
    ref: 'MLiteraryGenre',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MPersonalPreference', personalPreferenceSchema)