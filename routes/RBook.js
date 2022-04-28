const router = require('express').Router()
const cBook = require('../controllers/CBook')

router.post('/', cBook.createBook)
router.get('/', cBook.getAllBooks)
router.get('/:id', cBook.getBookById)
router.get('/user/:id', cBook.getBooksByUser)
router.put('/:id', cBook.updateBook)
router.delete('/:id', cBook.deleteBook)

module.exports = router