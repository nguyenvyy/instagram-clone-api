const {statusCodes} = require('../../config/globals')
module.exports = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const {status = statusCodes.BAD_REQUEST, message = 'Bad request'} = error
  return res.status(status).send({message})
};
