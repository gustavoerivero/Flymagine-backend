'use strict'

module.exports = (app) => {
  app.use('/role', require('./RRole'))
}