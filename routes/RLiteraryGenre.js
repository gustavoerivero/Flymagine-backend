const router = require('express').Router()
const cLiteraryGenre = require('../controllers/CLiteraryGenre')

router.post('/', cLiteraryGenre.createLiteraryGenre)
router.get('/', cLiteraryGenre.getAllLiteraryGenres)
router.get('/:id', cLiteraryGenre.getLiteraryGenreById)
router.put('/:id', cLiteraryGenre.updateLiteraryGenre)
router.delete('/:id', cLiteraryGenre.deleteLiteraryGenre)

module.exports = router