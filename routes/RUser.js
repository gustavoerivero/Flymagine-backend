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
router.post('/:id/set-book', cUser.setUserBook)
router.get('/:id/favourite', cUser.getFavouritesBooksByUser)
router.get('/:id/to-read', cUser.getToReadBooksByUser)
router.get('/:id/reading', cUser.getReadingBooksByUser)
router.get('/:id/read', cUser.getReadBooksByUser)

// Book actions routes
router.get('/book/:id/favourite', cUser.getFavouriteBookUsersByBook)
router.get('/book/:id/to-read', cUser.getToReadBookUsersByBook)
router.get('/book/:id/reading', cUser.getReadingBookUsersByBook)
router.get('/book/:id/read', cUser.getReadingBookUsersByBook)

// Personal preference actions routes
router.post('/:id/set-preference', cUser.setPersonalPreference)
router.get('/:id/preference', cUser.getPersonalPreference)
router.get('/preference/:id', cUser.getUserByPersonalPreference)
router.delete('/:id/preference/:idPreference', cUser.deletePersonalPreference)

// Reaction post actions routes
router.post('/:id/reaction-post', cUser.setReactionPost)

module.exports = router