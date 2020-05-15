const { Schema, model } = require('mongoose');
const Comment = require('./comment.model')
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
		type: [ Schema.Types.ObjectId ],
		default: []
	}
}, {timestamps: true});

postSchema.methods.checkUserIsLiked = function(userId) {
	return this.likeByIds.includes(userId);
};

postSchema.methods.getCommentCount = async function() {
	
	const count = await Comment.countDocuments({postId: this._id}) 
	return count
}
postSchema.methods.getId = function() {
	return this._id.toString();
};

module.exports = model('Post', postSchema);
