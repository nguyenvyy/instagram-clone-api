const router = require('express').Router()
const controller = require('../controllers/user.controller')
const notificationController = require('../controllers/notification.controller')
router.post('/', controller.registerUser)
router.get('/:id', controller.getUserById)
router.get('/:id/notifications', notificationController.getNotificationByUser)
router.patch('/:id', controller.updateAvatar)
module.exports = router