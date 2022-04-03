const moongose = require('mongoose')
require('dotenv').config()

let url = process.env.CONNECTION_STRING

moongose
  .connect(url)
  .then(db => {
    console.log("DB is connected")
    console.log(url)
  })
  .catch(err => {
    console.error(err)
    console.log(url)
  })