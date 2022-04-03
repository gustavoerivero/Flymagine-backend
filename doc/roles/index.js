const createRole = require('./createRole');

module.exports = {
  paths: {
    '/role': {
      ...createRole,
    },
  }
}