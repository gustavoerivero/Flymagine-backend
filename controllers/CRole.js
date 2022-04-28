const mRole = require('../models/MRole')
const resp = require('../utils/responses')

const createRole = async (req, res) => {
  try {
    const value = req.body

    const role = new mRole({
      name: value.name,
    })

    const saveRole = await role.save()
    resp.makeResponsesOkData(res, saveRole, "RCreated")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getAllRoles = async (req, res) => {
  try {
    const roles = await mRole.find()
    resp.makeResponsesOkData(res, roles, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const getRoleById = async (req, res) => {
  try {
    const id = req.params.id
    const role = await mRole.findById(id)
    resp.makeResponsesOkData(res, role, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const updateRole = async (req, res) => {
  try {
    const id = req.params.id
    const value = req.body
    const role = await mRole.findByIdAndUpdate(id, value)
    resp.makeResponsesOkData(res, role, "Success")
  } catch (error) {
    resp.makeResponsesError(res, error)
  }
}

const deleteRole = async (req, res) => {
  try {
    const id = req.params.id
    const role = await mRole.findByIdAndDelete(id)
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