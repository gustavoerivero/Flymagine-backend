const router = require('express').Router()
const cHashtag = require('../controllers/CHashtag')

router.post('/', cHashtag.createHashtag)
router.get('/', cHashtag.getAllHashtags)
router.get('/:name', cHashtag.getHashtagByName)
router.get('/id/:id', cHashtag.getHashtagById)
router.get('/search/:search', cHashtag.searchHashtag)
router.put('/id/:id', cHashtag.updateHashtag)
router.delete('/id/:id', cHashtag.deleteHashtag)

module.exports = router