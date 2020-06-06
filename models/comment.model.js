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

commentSchema.methods.checkUserIsLiked = function(userId) {
	return this.likeByIds ? this.likeByIds.includes(userId) : false;
};

commentSchema.method.getRelyComments = function(commentId, postId) {

}
commentSchema.method.getNumOfRelyComments = function(commentId, postId) {

}

module.exports = model('Comment', commentSchema)