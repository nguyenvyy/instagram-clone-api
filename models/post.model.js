const { Schema, model } = require('mongoose');
const { ObjectId, String } = Schema.Types
const Comment = require('./comment.model')
const postSchema = new Schema({
	byUser: {
		type: ObjectId,
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
		type: [ ObjectId ],
	}
}, {timestamps: true});

postSchema.methods.values = function() {
	
}
postSchema.methods.checkUserIsLiked = function(userId) {
	return this.likeByIds ? this.likeByIds.includes(userId) : false;
};

postSchema.methods.getCommentCount = async function() {
	
	const count = await Comment.countDocuments({postId: this._id}) 
	return count
}
postSchema.methods.getId = function() {
	return this._id.toString();
};

module.exports = model('Post', postSchema);
