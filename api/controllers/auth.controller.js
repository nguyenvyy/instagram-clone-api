const { generateAccessToken } = require('../../utils/jwt')
const { verifyPassword, Exception } = require('../../utils')
const User = require('../../models/user.model')
const { statusCodes, env } = require('../../config/globals');


const login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        if(!username || !password) throw new Exception('username or password incorrect')
        const user = await User.findOne({username}, {createdAt: 0, updatedAt: 0, __v: 0})
        if(!user) throw new Exception('username or password incorrect')
        const isValidPassword = await verifyPassword(user.password, password)
        if(!isValidPassword) throw new Exception('username or password incorrect')
        delete user._doc.password
        const token = await generateAccessToken(
            {
                _id: user._id, 
                username: user.username, 
                avatarUrl: user.avatarUrl,
                fullname: user.fullname,
            }, env.JWT_SECRET_KEY, '7d')
        res.status(statusCodes.OK).send({user, token})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login
}