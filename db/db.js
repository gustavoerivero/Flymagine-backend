const moongose = require('mongoose')
require('dotenv').config()

let url = process.env.CONNECTION_STRING.toString()

moongose
  .connect(url)
  .then(db => {
    console.log(`Database is conected on ${url}`)
  })
  .catch(err => {
    console.error(err)
    console.log(url)
  })