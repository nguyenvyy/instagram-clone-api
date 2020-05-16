const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
router.post('/login', controller.login)
router.post('/register', userController.registerUser)


module.exports = router