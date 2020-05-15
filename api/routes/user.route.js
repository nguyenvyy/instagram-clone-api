const router = require('express').Router()
const controller = require('../controllers/user.controller')
router.post('/', controller.registerUser)
router.get('/:id', controller.getUserById)
router.patch('/:id', controller.updateAvatar)
module.exports = router