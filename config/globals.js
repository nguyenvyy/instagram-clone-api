module.exports = {
	env: {
		PORT: process.env.PORT || 4000,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		CLOUDINARY_URL: process.env.CLOUDINARY_URL,
		MONGODB_CONNECT_URI: process.env.NODE_ENV === 'production' ? process.env.MONGODB_CONNECT_URI : 'mongodb://localhost:27017/instagram?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
		NODE_ENV: process.env.NODE_ENV || 'development',
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
	},
	statusCodes: {
		OK: 200,
		BAD_REQUEST: 400,
		NOT_FOUND: 404,
		UNAUTHORIZED: 401
	},
	errorCodes: {
		invalid: {
			code: 1,
			description: '`invalid ${field}`'
		},
		existed: {
			code: 2,
			description: '`${field} existed`'
		},
	}
};
