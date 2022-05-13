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
router.post('/:id/genres', cBook.setBookGenre)
router.get('/:id/genres', cBook.getBookGenre)
router.get('/genres/:id', cBook.getBooksByGenre)
router.put('/:id/genres', cBook.updateBookGenre)
router.put('/:id/genres/delete', cBook.deleteBookGenre)

module.exports = router