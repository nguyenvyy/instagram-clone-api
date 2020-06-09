//controller 
const postController = require('./controllers/post.controller')
//routes
const user = require('./routes/user.route')
const auth = require('./routes/auth.route')
const post = require('./routes/post.route')
const comment = require('./routes/comment.route')
// middlewares
const authMiddleware = require('./middlewares/auth')
// init rest routes
module.exports = router => {
  const prefix = "/api/v1";
  router.post(`${prefix}/mock-upload`, postController.mockUpload)
  router.use(`${prefix}/auth`, auth)
  router.use(`${prefix}/users`, authMiddleware.isAuthorized, user)
  router.use(`${prefix}/posts`, authMiddleware.isAuthorized, post)
  router.use(`${prefix}/comments`, authMiddleware.isAuthorized, comment)
};
