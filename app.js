const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const swaggerDocs = require('./services/swagger')
const routes = require('./routes')
const auth = require('./config/auth')

require('dotenv').config()
require('./db/db')

// Swagger
const swaggerUi = require('swagger-ui-express')

// Settings
const port = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(auth.authJwt())

app.use((err, req, res, next) => {
  auth.errorHandler(err, req, res, next)
})

app.use(`${process.env.URL}/public/images`, express.static(__dirname + '/public/images'))
app.use(`${process.env.URL}/public/docs`, express.static(__dirname + '/public/docs'))

app.use(cors())
app.use(`${process.env.API_DOC}`, swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
app.use(`${process.env.URL}${process.env.API_URL}`, routes)

// Start server
app.get(process.env.URL, (req, res) => res.send('Connected!'))
app.get(`${process.env.URL}${process.env.API_URL}`, (req, res) =>
  res.send(`Connected on Flymagine API ${process.env.API_VER} version!`))
app.listen(port, () => {
  console.log(`Server is running on ${process.env.URL}`)
})