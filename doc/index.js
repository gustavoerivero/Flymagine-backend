const basicInfo = require('./basicInfo')
const servers = require('./servers')
const components = require('./components')
const models = require('./models')
const roles = require('./roles')

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...models,
  ...roles,
}