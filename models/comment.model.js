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
    likeByUserId: {
        type: [ObjectId],
    }
}, {timestamps: true})

commentSchema.methods.values = function() {
	
}

commentSchema.methods.checkUserIsLiked = function(userId) {
	return this.likeByIds ? this.likeByIds.includes(userId) : false;
};

commentSchema.method.getReplyComments = function(commentId, postId) {

}
commentSchema.method.getNumOfReplyComments = function(commentId, postId) {

}

module.exports = model('Comment', commentSchema)