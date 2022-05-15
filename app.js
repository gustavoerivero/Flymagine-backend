const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const docs = require('./doc')
const routes = require('./routes')

require('dotenv').config()

require('./db/db')

// Swagger
const swaggerUi = require('swagger-ui-express')

// Settings
const api = process.env.API_URL
const port = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))

app.use('/public/images', express.static(__dirname + '/public/images'))
app.use('/public/docs', express.static(__dirname + '/public/docs'))

app.use(cors())
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(docs))

// Routes
app.use(api, routes)

app.get('/', (req, res) => res.send('Connected!'))
app.get(`${api}/`, (req, res) => res.send(`Connected on Flymagine API ${process.env.API_VER} version!`))

app.listen(port, () => {
  console.log(`Server is running on ${process.env.URL}`)
})