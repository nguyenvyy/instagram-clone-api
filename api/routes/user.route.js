const router = require('express').Router()
const controller = require('../controllers/user.controller')
router.post('/', controller.registerUser)
module.exports = router