const createRole = require('./createRole')
const getRoles = require('./getRoles')
const getRoleById = require('./getRoleById')
const updateRole = require('./updateRole')
const deleteRole = require('./deleteRole')

module.exports = {
  paths: {
    '/role': {
      ...createRole,
      ...getRoles,
    },
    '/role/{id}': {
      ...getRoleById,
      ...updateRole,
      ...deleteRole,
    },
  }
}