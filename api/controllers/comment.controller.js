const Comment = require('../../models/comment.model');
const Notification = require('../../models/notification.model');
const { Exception } = require('../../utils');
const { statusCodes } = require('../../config/globals');

const addComment = async (req, res, next) => {
	try {
        const { byUser, postId, content, postAuthor } = req.body;
        const authId = req.auth._id
        if(byUser !== authId) throw new Exception('invalid byUser')
		const comment = new Comment({ byUser, postId, content });
        await comment.save();
        
        // add notification for post author
        const notification = new Notification({
            toUserId: postAuthor, 
            byUser: byUser, 
            byPostId: postId,
            action: 'comment'
        })
        await notification.save()

		return res.status(statusCodes.OK).send({ comment });
	} catch (error) {
		next(error);
	}
};

const getCommentsByPostId = async (req, res, next) => {
	try {
		const { id: postId } = req.params;
		let { page = 0, limit = 5 } = req.query;
		page = +page;
		limit = +limit;
        const comments = await Comment.find(
            { postId }, 
            { postId: 0, updatedAt: 0, __v: 0 }
            )
            .populate('byUser', 'username avatarUrl');
		if (!comments) throw new Exception('comments not found', statusCodes.NOT_FOUND);
		return res.status(statusCodes.OK).send({ comments });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addComment,
	getCommentsByPostId
};
