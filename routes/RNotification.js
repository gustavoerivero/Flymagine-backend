const router = require('express').Router()
const cNotification = require('../controllers/CNotification')

router.post('/', cNotification.createNotification)
router.get('/', cNotification.getAllNotification)
router.get('/:id', cNotification.getNotificationById)
router.get('/user/:id', cNotification.getNotificationByUser)
router.put('/:id', cNotification.updateNotification)
router.delete('/:id', cNotification.deleteNotification)
router.delete('/user/:id', cNotification.deleteAllNotificationByUser)
router.put('/read/:id', cNotification.readNotification)

module.exports = router
