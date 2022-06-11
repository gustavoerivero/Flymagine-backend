require('dotenv').config()

module.exports = {
  servers: [
    {
      url: process.env.URL.toString() + process.env.API_URL.toString(),
      description: 'Backend API',
    },
  ]
}