const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

require('dotenv').config()

require('./db/db')

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = {
  swaggerDefinition: {
    info: {
      title: 'Flymagine Backend API Documentation',
      version: '1.0.0',
      description: 'The Flymagine API is a set of high-performance RESTful JSON endpoints that are specifically designed to meet the business logic needs of the wonderful Flymagine social network. \nThis API reference includes all the technical documentation developers need to integrate with the Flymagine social network frontend.',
    },
    host: process.env.HOST,
    basePath: '/',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      }
    },
  },
  openapi: '3.0.0',
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
    }
  ],
  apis: [
    `${path.join(__dirname, './routes/*.js')}`,
  ],
}

// Settings
const api = process.env.API_URL
const port = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)))

// Routes
require('./routes')(app)

app.get('/', (req, res) => res.send('Connected!'))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})