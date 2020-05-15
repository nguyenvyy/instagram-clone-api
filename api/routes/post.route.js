const router = require('express').Router()
const controller = require('../controllers/post.controller')
const commentController = require('../controllers/comment.controller')
router.get('/', controller.getPosts)
router.post('/', controller.addNewPost)
router.get('/:id', controller.getPostById)
router.get('/:id/comments', commentController.getCommentsByPostId)
router.patch('/:id', controller.likePost)
module.exports = router