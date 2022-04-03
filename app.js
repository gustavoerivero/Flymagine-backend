const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const docs = require('./doc')

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
app.use(cors())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(docs))

// Routes
require('./routes')(app)

app.get('/', (req, res) => res.send('Connected!'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})