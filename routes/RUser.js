const router = require('express').Router()
const cUser = require('../controllers/CUser')
const { imageUpload } = require('../utils/multer')

// User actions routes
router.post('/register', cUser.createUser)
router.post('/:id/image', imageUpload.single('photo'), cUser.uploadProfileImage)
router.post('/login', cUser.login)
router.post('/restore', cUser.restoredPassword)
router.post('/:id/password', cUser.changePassword)
router.get('/page=:page&limit=:limit', cUser.getAllUsers)
router.get('/:id', cUser.getUser)
router.get('/:id/only', cUser.getOnlyUser)
router.get('/search=:search/page=:page&limit=:limit', cUser.getFilterUsers)
router.put('/:id', cUser.updateUser)
router.delete('/:id', cUser.deleteUser)

// Follows actions routes
router.post('/:id/follows', cUser.setFollowUser)
router.get('/:id/follows', cUser.getFollows)
router.get('/:id/followers', cUser.getFollowers)

// User book actions routes
router.post('/:id/fav', cUser.setUserBookFav)
router.post('/:id/to-read', cUser.setUserBookToRead)
router.post('/:id/reading', cUser.setUserBookReading)
router.post('/:id/read', cUser.setUserBookRead)
router.get('/:id/fav', cUser.getBooksFavByUser)
router.get('/:id/to-read', cUser.getBooksToReadByUser)
router.get('/:id/reading', cUser.getBooksReadingByUser)
router.get('/:id/read', cUser.getBooksReadByUser)

// Personal preference actions routes
router.post('/preferences', cUser.setPersonalPreference)
router.get('/:id/preferences', cUser.getPersonalPreference)
router.get('/preferences/:id', cUser.getUserByPersonalPreference)
router.put('/:id/preferences/delete', cUser.deleteAllPersonalPreference)


module.exports = router