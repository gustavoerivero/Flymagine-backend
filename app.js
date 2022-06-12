const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const docs = require('./doc')
const routes = require('./routes')
const auth = require('./config/auth')

require('dotenv').config()

require('./db/db')

// Swagger
const swaggerUi = require('swagger-ui-express')

// Settings
const url = '/flymagine'
const api = '/api/v1'
const url_api = url + api
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

app.use('/flymagine/public/images', express.static(__dirname + '/public/images'))
app.use('/flymagine/public/docs', express.static(__dirname + '/public/docs'))

app.use(cors())
app.use('/flymagine/api/doc', swaggerUi.serve, swaggerUi.setup(docs))

// Routes
app.use(url_api, routes)

app.get('/flymagine', (req, res) => res.send('Connected!'))
app.get('/flymagine/api/v1', (req, res) => res.send(`Connected on Flymagine API ${process.env.API_VER} version!`))

app.listen(port, () => {
  console.log(`Server is running on ${process.env.URL}`)
})