const router = require('express').Router()
const cBook = require('../controllers/CBook')
const { imageUpload, docUpload } = require('../utils/multer')

// Book actions routes
router.post('/', cBook.createBook)
router.get('/page=:page&limit=:limit', cBook.getAllBooks)
router.get('/:id', cBook.getBookById)
router.get('/user=:id/page=:page&limit=:limit', cBook.getBooksByUser)
router.get('/search=:search/page=:page&limit=:limit', cBook.getFilterBooks)
router.put('/:id', cBook.updateBook)
router.post('/:id/image', imageUpload.single('photo'), cBook.uploadImage)
router.post('/:id/document', docUpload.single('document'), cBook.uploadDocument)
router.delete('/:id', cBook.deleteBook)

// Book genre actions routes
router.post('/:id/genres', cBook.setBookGenre)
router.get('/:id/genres', cBook.getBookGenre)
router.get('/genres/:id', cBook.getBooksByGenre)
router.put('/:id/genres/delete', cBook.deleteBookGenre)

module.exports = router