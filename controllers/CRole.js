const mRole = require('../models/MRole')
const resp = require('../utils/responses')

const createRole = async (req, res) => {
  try {
    const value = req.body

    const role = new mRole({
      name: value.name,
    })

    if (await mRole.findOne({ name: value.name, status: 'A' })) {
      resp.makeResponsesError(res, "RFound")
    } else if (await mRole.findOne({ name: value.name, status: 'I' })) {
      const saveRole = await mRole.findOneAndUpdate({ name: value.name }, {
        $set: {
          status: 'A',
          deletedAt: null
        }
      })
      resp.makeResponsesOkData(res, saveRole, "Success")
    } else {
      const saveRole = await role.save()
      resp.makeResponsesOkData(res, saveRole, "RCreated")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllRoles = async (req, res) => {
  try {
    const roles = await mRole.find({ status: 'A' })
    resp.makeResponsesOkData(res, roles, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getRoleById = async (req, res) => {
  try {

    const id = req.params.id
    const role = await mRole.find({ _id: id, status: 'A' })

    if (role) {
      resp.makeResponsesOkData(res, role, "Success")
    } else {
      resp.makeResponsesError(res, "RFound")
    }

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateRole = async (req, res) => {
  try {

    const role = await mRole.findOneAndUpdate({ _id: req.params.id, status: 'A' }, {
      $set: {
        name: req.body.name
      }
    })

    resp.makeResponsesOkData(res, role, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteRole = async (req, res) => {
  try {
    const id = req.params.id

    const role = await mRole.findOneAndUpdate({ _id: id, status: 'A' }, {
      $set: {
        status: 'I',
        deletedAt: new Date()
      }
    })

    resp.makeResponsesOkData(res, role, "Success")

  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
}