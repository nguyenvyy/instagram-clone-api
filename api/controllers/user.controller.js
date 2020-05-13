const User = require('../../models/user.model')
const { Exception, hashPassword } = require('../../utils')
const isEmail = require('validator/lib/isEmail')
const { statusCodes } = require('../../config/globals')
module.exports.registerUser = async (req, res, next) => {
    try {
        const {email, displayName, fullName, password, birthday} = req.body
        // check email valid
        if(!isEmail(email)) throw new Exception('Invalid email')
        // check existed: displayName & email
        const [isExistedEmail, isExistedDisplayName] = await Promise.all([
            User.exists({email}),
            User.exists({displayName})  
        ])
        if(isExistedEmail) throw new Exception('Email existed')
        if(isExistedDisplayName) throw new Exception('DisplayName existed')
        // hash password
        const hashedPassword = await hashPassword(password)
        // create new user
        const user = new User({email, displayName, fullName, password: hashedPassword, birthday})
        await user.save()
        return res.status(statusCodes.OK).send({user})
    } catch (error) {
        console.log(error)
        next(error)
    }
}
