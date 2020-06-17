const {Schema, model} = require("mongoose");
const isEmail = require('validator/lib/isEmail')
const {String, Date, Boolean} = Schema.Types
const {hashPassword} = require('../utils')
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
  fullname: {
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
    type: Date,
  },
  avatarUrl: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

userSchema.methods.values = function() {
	
}

userSchema.methods.getId = function() {
  return this._id.toString()
}

userSchema.pre('save',async function (next) {
  if (this.isModified('password')) {
      this.password = await hashPassword(this.password)
  }
  next()
})


module.exports = model("User", userSchema);
