const {statusCodes} = require('../../config/globals')
module.exports = (error, req, res, next) => {
  console.error(error)
  if (res.headersSent) {
    return next(error);
  }
  const {status = statusCodes.BAD_REQUEST, message = 'Bad request'} = error
  return res.status(status).send({message})
};
