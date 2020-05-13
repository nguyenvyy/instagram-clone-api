const mongoose = require("mongoose");
const isEmail = require('validator/lib/isEmail')
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    maxLength: 64,
    minLength:3,
    validate: [isEmail, 'Invalid email']
  },
  displayName: {
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

module.exports = mongoose.model("User", userSchema);
