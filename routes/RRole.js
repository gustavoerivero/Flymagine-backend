const router = require('express').Router()
const cRole = require('../controllers/CRole')

router.post('/', cRole.createRole)
router.get('/all', cRole.getAllRoles)
router.get('/:id', cRole.getRoleById)
router.put('/:id', cRole.updateRole)
router.delete('/:id', cRole.deleteRole)

module.exports = router