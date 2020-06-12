const { Schema, model } = require('mongoose')
const { ObjectId, String } = Schema.Types
const commentSchema = new Schema({
    byUser: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: ObjectId,
        required: true,
        index: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    replyToCommentId: {
        type: ObjectId,
        index: true
    },
    likeByIds: {
        type: [ObjectId],
    }
}, {timestamps: true})

commentSchema.methods.values = function() {
    const { _id, byUser, postId, content, replyToCommentId = null, likeByIds, createdAt  } = this
    return {
        _id, byUser, postId, 
        content, replyToCommentId, createdAt,
        numLikes: likeByIds.length,
        likeByIds
    }
}

commentSchema.methods.checkUserIsLiked = function(userId) {
	if(this.likeByIds.length === 0 ) return false
	return this.likeByIds.includes(userId) ? true : false
};

commentSchema.method.getReplyComments = function(commentId, postId) {

}
commentSchema.method.getNumOfReplyComments = function(commentId, postId) {

}

module.exports = model('Comment', commentSchema)