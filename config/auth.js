const { expressjwt: expressJwt } = require('express-jwt')
const resp = require('../utils/responses')
require('dotenv').config()

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
      `${url}`,
      `${url}${api}`,	
      `${url}${api}/user/login`,
      `${url}${api}/user/register`,
      `${url}${api}/user/preferences`,
      `${url}${api}/user/restore`,
      `${url}${api}/literary-genre`,
      `${url}${api}/role`,

      // Documentation API 
      `${api_doc}`,   
      `${api_doc}/#`,
    ]
  })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return resp.makeResponsesError(res, 'ULoginError3')
  }

  if (err.name === 'ValidationError') {
    return resp.makeResponsesError(res, err)
  }

  return resp.makeResponsesError(res, 'UnexpectedError')
}

module.exports = {
  authJwt,
  errorHandler,
}