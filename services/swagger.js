const swaggerJsonDoc = require('swagger-jsdoc')

const swaggerOptions = {
  openapi: '3.0.0',
  definition: {
    info: {
      title: 'Flymagine Backend API Documentation',
      version: '1.0.0',
      description: "Flymagine; Write, read, imagine! It's a social network for all the readers and writers of the world! Here, not only can you share with your friends posts, comments, even reactions to their comments and posts, but you can also visualize the books of your favorite writers, leave them your own review with the score you consider. In this section, you will find the respective Swagger UI documentation to test the REST API that will be implemented for Flymagine v1.1.0.",
      contact: {
        name: 'Flymagine',
        email: 'soporteflymagine@gmail.com',
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./doc/*/*.yml', './doc/*/*/*.yml']
}

module.exports = swaggerJsonDoc(swaggerOptions)
