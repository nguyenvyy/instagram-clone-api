const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  Exception: function Exception(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  },
  hashPassword: plainPassword => {
    return bcrypt.hash(plainPassword, 10);
  },
  verifyPassword(hashPassword, plainPassword) {
    return bcrypt.compare(plainPassword, hashPassword);
  },
  /**
   * Check file is image of ['image/png', 'image/jpeg']
   * @param {string} mimetype
   */
  checkIsImage(mimetype) {
    const acceptImageTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/x-icon"
    ];
    return acceptImageTypes.includes(mimetype);
  }
};
