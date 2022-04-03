require('dotenv').config()

module.exports = {
  servers: [
    {
      url: process.env.URL,
      description: 'Backend API',
    },
  ]
}