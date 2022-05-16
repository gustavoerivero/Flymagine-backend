const router = require('express').Router()
const cUser = require('../controllers/CUser')
const { imageUpload } = require('../utils/multer')

// User actions routes
router.post('/', cUser.createUser)
router.post('/:id/image', imageUpload.single('photo'), cUser.uploadProfileImage)
router.post('/login', cUser.login)
router.post('/restored/:email', cUser.restoredPassword)
router.get('/', cUser.getAllUsers)
router.get('/:id', cUser.getUser)
router.get('/:id/only', cUser.getOnlyUser)
router.put('/:id', cUser.updateUser)
router.delete('/:id', cUser.deleteUser)

// Follows actions routes
router.post('/:id/follows', cUser.setFollowUser)
router.get('/:id/follows', cUser.getFollows)
router.get('/:id/followers', cUser.getFollowers)
router.put('/:id/follows', cUser.updateFollows)

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
router.post('/:id/preferences', cUser.setPersonalPreference)
router.get('/:id/preferences', cUser.getPersonalPreference)
router.get('/preferences/:id', cUser.getUserByPersonalPreference)
router.put('/:id/preferences/delete', cUser.deleteAllPersonalPreference)


module.exports = router