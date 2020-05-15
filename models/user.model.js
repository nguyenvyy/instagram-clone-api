const {Schema, model} = require("mongoose");
const isEmail = require('validator/lib/isEmail')
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 64,
    minLength:3,
    validate: [isEmail, 'Invalid email']
  },
  username: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 2,
    unique: true
  },
  fullName: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 2
  },
  password: {
    type: String,
    required: true,
    maxLength: 12,
    minLength: 6,
  },
  birthday : {
    required: true,
    type: Date,
  },
  avatarUrl: {
    type: String
  }
}, {timestamps: true});


userSchema.methods.getId = function() {
  return this._id.toString()
}

module.exports = model("User", userSchema);
