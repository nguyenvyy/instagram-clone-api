const Comment = require('../../models/comment.model');
const Reaction = require('../../models/reaction.model');
const { Exception } = require('../../utils');
const { statusCodes } = require('../../config/globals');
const reactionTypes = require('../../constants/reaction-types')
const addComment = async (req, res, next) => {
    try {
        const { byUser, postId, content, postAuthor, replyToCommentId } = req.body;
        const authId = req.auth._id
        if (byUser !== authId) throw new Exception('invalid byUser')
        const comment = new Comment({ byUser, postId, content, replyToCommentId });
        await comment.save();

        // add notification for post author
        const notification = new Reaction({
            toUserId: postAuthor,
            byUser: byUser,
            byPostId: postId,
            action: 'comment'
        })
        notification.save()

        return res.status(statusCodes.OK).send({ comment });
    } catch (error) {
        next(error);
    }
};

const likeComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const authId = req.auth._id
        const comment = await Comment.findOneAndUpdate(
            { _id: id },
            { $addToSet: { likeByIds: authId } }
        )
            .populate('byUser', 'username avatarUrl')
        //check post not found or user liked
        if (!comment) throw new Exception('comment not found')
        // add notification for post author
        console.log(reactionTypes)
        const notification = new Reaction({
            toUserId: comment._doc.byUser,
            byUser: authId,
            action: reactionTypes.like_comment
        })
        notification.save()
        return res.status(statusCodes.OK).send({ message: 'like successful' })
    } catch (error) {
        next(error)
    }
}

const unLikeComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const authId = req.auth._id
        const comment = await Comment.findOneAndUpdate(
            {
                _id: id,
                likeByIds: { $in: authId }
            }, 
            { $pullAll: { likeByIds: [authId] } }
            )
        //check post not found or user liked
        if (!comment) throw new Exception('comment not found')
        // add notification for post author
        return res.status(statusCodes.OK).send({ message: 'unlike successful' })
    } catch (error) {
        next(error)
    }
}

const getCommentsByPostId = async (req, res, next) => {
    try {
        const { id: postId } = req.params;
        let { skip = 0, limit = 5 } = req.query;
        const {_id: authId} = req.auth
        skip = +skip;
        limit = +limit;
        let comments = await Comment.find(
            { postId, replyToCommentId: {$exists: false}}, null,
            { skip, limit }
        )
            .sort({ createdAt: 1 })
            .populate('byUser', 'username avatarUrl');
        comments = await Promise.all(comments.map(async (comment) => {
            
            let replyComments = await Comment.find({
                postId, replyToCommentId: comment._id
            }).populate('byUser', 'username avatarUrl');
            
            replyComments = replyComments.map(replyComment => ({
                ...replyComment.values(), canLike: replyComment.checkUserIsLiked(authId)
            }))

            return {...comment.values(), canLike: comment.checkUserIsLiked(authId), replyComments,numReplyComments: replyComments.length}
        }))
        if (!comments) throw new Exception('comments not found', statusCodes.NOT_FOUND);
        return res.status(statusCodes.OK).send({ comments });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addComment,
    getCommentsByPostId,
    likeComment,
    unLikeComment
};
