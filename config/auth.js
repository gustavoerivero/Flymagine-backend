const { expressjwt: expressJwt } = require('express-jwt')
const resp = require('../utils/responses')
require('dotenv').config()

/**
 * @description - Middleware to check if the user is connected or not. If so, it will continue to the next middleware. Here, some routes are excluded from a required user authentication.
 * @returns {function} middleware function
 */
const authJwt = () => {
  const url = process.env.URL
  const api = process.env.API_URL
  const api_doc = process.env.API_DOC
  const secret = process.env.SECRET_KEY
  return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [

      // Public routes that don't require authentication
      `${url}/`,
      `${url}${api}`,	
      `${url}${api}/user/login`,
      `${url}${api}/user/register`,
      `${url}${api}/user/preferences`,
      `${url}${api}/user/restore`,
      `${url}${api}/literary-genre`,
      `${url}${api}/role`,

      // Documentation API 
      `${api_doc}`,   
      `${api_doc}/`,
      `${api_doc}/*`,
      `${api_doc}/#`,
      
      // Swagger API
      `${api_doc}/swagger-ui.css`,
      `${api_doc}/swagger-ui-init.js`,
      `${api_doc}/swagger-ui-bundle.js`,
      `${api_doc}/swagger-ui-standalone-preset.js`,

       // Swagger API extensions      
      `${api_doc}/swagger-ui.css.map`,
      `${api_doc}/swagger-ui-init.js.map`,
      `${api_doc}/swagger-ui-bundle.js.map`,
      `${api_doc}/swagger-ui-standalone-preset.js.map`,
    ]
  })
}

/**
 * @description - Middleware to check if the user is connected or not. If not, it will return a error object.
 * @returns {JSON} error message
 */
const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return resp.makeResponsesError(res, err.message, 'ULoginError3')
  }

  if (err.name === 'ValidationError') {
    return resp.makeResponsesError(res, err.message, err)
  }

  return resp.makeResponsesError(res, err, 'UnexpectedError')
}

module.exports = {
  authJwt,
  errorHandler,
}