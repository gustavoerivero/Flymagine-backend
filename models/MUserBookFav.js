const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBookFavScheme = new Schema({
  booksFav: [{
    type: Schema.Types.ObjectId,
    ref: 'MBook',
    required: true,
  }],
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'MUser',
    required: true,
  },
}, { timestamps: true })

module.exports = mongoose.model('MUserBookFav', userBookFavScheme)