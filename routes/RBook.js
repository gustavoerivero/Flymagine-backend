const router = require('express').Router()
const cBook = require('../controllers/CBook')

// Book actions routes
router.post('/', cBook.createBook)
router.get('/', cBook.getAllBooks)
router.get('/:id', cBook.getBookById)
router.get('/user/:id', cBook.getBooksByUser)
router.put('/:id', cBook.updateBook)
router.delete('/:id', cBook.deleteBook)

// Book genre actions routes
router.post('/:id/set-genre', cBook.setBookGenre)
router.get('/:id/genre', cBook.getBookGenres)
router.get('/genre/:id', cBook.getBooksByGenre)
router.delete('/:id/genre/:idGenre', cBook.deleteBookGenre)

module.exports = router