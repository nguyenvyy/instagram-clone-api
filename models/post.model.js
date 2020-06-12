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
	const {byUser, caption, imageUrl, likeByIds, _id, createdAt} = this
	return {
		_id, byUser, caption, imageUrl, numLikes: likeByIds ? likeByIds.length : 0, createdAt
	}
}
postSchema.methods.checkUserIsLiked = function(userId) {
	if(this.likeByIds.length === 0 ) return false
	return this.likeByIds.includes(userId) ? true : false
};

postSchema.methods.getCommentCount = async function() {
	
	const count = await Comment.countDocuments({postId: this._id}) 
	return count
}
postSchema.methods.getId = function() {
	return this._id.toString();
};

module.exports = model('Post', postSchema);
