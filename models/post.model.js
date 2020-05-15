const { Schema, model } = require('mongoose');

const postSchema = new Schema({
	byUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		index: true
	},
	caption: {
		type: String,
		required: true,
		trim: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	likeByIds: {
		type: [ String ],
		default: []
	}
}, {timestamps: true});

postSchema.methods.checkUserIsLiked = function(userId) {
	return this.likeByIds.include(userId);
};

postSchema.methods.getId = function() {
	return this._id.toString();
};

module.exports = model(postSchema, 'Post');
