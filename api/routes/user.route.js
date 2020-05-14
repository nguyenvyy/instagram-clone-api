const router = require('express').Router()
const controller = require('../controllers/user.controller')
router.post('/', controller.registerUser)
router.get('/:id', controller.getUserById)
router.post('/:id/avatar', controller.updateAvatar)
module.exports = router