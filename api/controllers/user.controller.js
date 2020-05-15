const User = require('../../models/user.model');
const { Exception, hashPassword, checkIsImage } = require('../../utils');
const isEmail = require('validator/lib/isEmail');
const { statusCodes } = require('../../config/globals');
module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, fullName, password, birthday } = req.body;
		// check email valid
		if (!isEmail(email)) throw new Exception('Invalid email');
		// check existed: username & email
		const [ isExistedEmail, isExistedUsername ] = await Promise.all([
			User.exists({ email }),
			User.exists({ username })
		]);
		if (isExistedEmail) throw new Exception('Email existed');
		if (isExistedUsername) throw new Exception('username existed');
		// hash password
		const hashedPassword = await hashPassword(password);
		// create new user
		const user = new User({ email, username, fullName, password: hashedPassword, birthday });
        await user.save();
		return res.status(statusCodes.OK).send({message: 'registered successful'});
	} catch (error) {
		next(error);
	}
};

module.exports.updateAvatar = async (req, res, next) => {
	try {
		const { avatarUrl } = req.body;
        if(!avatarUrl) throw new Exception('invalid avatarUrl')
		const { id } = req.params;
        const { authId } = req.user;
        // check id match with auth
        if(authId !== id) throw new Exception('invalid id')
        const user = await User.findByIdAndUpdate(id, {avatarUrl}, {new: true})
        if(!user) throw new Exception('user not found', statusCodes.NOT_FOUND)        
        res.status(statusCodes.OK).send({message: 'updated avatar successful'})
	} catch (error) {
		next(error);
	}
};

module.exports.getUserById = async (req, res, next) => {
	try {
		const {id} = req.params
		if(!id) throw new Exception('invalid id');
		const user = await User.findById(id, {password: 0, createdAt: 0, updatedAt: 0, __v: 0})
		if(!user) throw new Exception('user not found', statusCodes.NOT_FOUND)
		return res.status(statusCodes.OK).send({user})
	} catch (error) {
		next(error)
	}
}



