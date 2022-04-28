const router = require('express').Router()
const cHashtag = require('../controllers/CHashtag')

router.post('/', cHashtag.createHashtag)
router.get('/', cHashtag.getAllHashtags)
router.get('/:name', cHashtag.getHashtagByName)
router.put('/:id', cHashtag.updateHashtag)
router.delete('/:id', cHashtag.deleteHashtag)

module.exports = router