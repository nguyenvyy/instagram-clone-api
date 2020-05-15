const router = require('express').Router()
const controller = require('../controllers/post.controller')
router.get('/', controller.getPosts)
router.post('/', controller.addNewPost)
router.get('/:id', controller.getPostById)
router.patch('/:id', controller.likePost)
module.exports = router