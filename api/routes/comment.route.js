const router = require('express').Router()
const controller = require('../controllers/comment.controller')
router.post('/', controller.addComment)
router.patch('/:id/like', controller.likeComment)
router.patch('/:id/unlike', controller.unLikeComment)
module.exports = router