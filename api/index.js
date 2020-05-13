//routes
const user = require('./routes/user.route')
// init rest routes
module.exports = router => {
  const prefix = "/api/v1";
  router.use(`${prefix}/users`, user)
};
