'use strict'

module.exports = (app) => {
  app.use('/role', require('./RRole'))
  app.use('/user', require('./RUser'))
}