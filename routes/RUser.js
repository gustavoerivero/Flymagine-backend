const router = require('express').Router()
const cUser = require('../controllers/CUser')

// User actions routes
router.post('/', cUser.createUser)
router.post('/login', cUser.login)
router.get('/', cUser.getAllUsers)
router.get('/:id', cUser.getUser)
router.put('/:id', cUser.updateUser)
router.delete('/:id', cUser.deleteUser)

// User book actions routes
router.get('/:id/favourite', cUser.getFavouritesBooksByUser)
router.get('/:id/to-read', cUser.getToReadBooksByUser)
router.get('/:id/reading', cUser.getReadingBooksByUser)
router.get('/:id/read', cUser.getReadBooksByUser)

module.exports = router