const Post = require('../../models/post.model')
const Reaction = require('../../models/reaction.model')
const { statusCodes } = require('../../config/globals')
const { Exception } = require('../../utils')
const { cloundinaryUploader } = require('../services/cloundinary')
const addNewPost = async (req, res, next) => {
    try {
        const { byUser, caption, imageUrl: base64 } = req.body
        const post = new Post({ byUser, caption, base64 })
        const uploader = await cloundinaryUploader.upload(base64, {
            public_id: `instagram/photos/${post._id}`
        });
        post.imageUrl = uploader.url
        await post.save()
        return res.status(statusCodes.OK).send({ post: { ...post.values(), canLike: true, commentCount: 0} })
    } catch (error) {
        next(error)
    }
}

const likePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const authId = req.auth._id
        const post = await Post.findOneAndUpdate(
            {
                _id: id, 
                likeByIds: {$nin: [authId]} 
            }, 
            { $push: { likeByIds: authId } }
        )
        //check post not found 
        if (!post) throw new Exception('post not found')
        // add notification for post author
        const notification = new Reaction({
            toUserId: post._doc.byUser,
            byUser: authId,
            byPostId: post._id,
            action: 'like'
        })
        notification.save()
        return res.status(statusCodes.OK).send({ message: 'like successful' })
    } catch (error) {
        next(error)
    }
}
const unlikePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const authId = req.auth._id
        const post = await Post.findOneAndUpdate(
            {
                _id: id,
                likeByIds: { $in: authId }
            }, 
            { $pullAll: { likeByIds: [authId] } }
            )
        //check post not found
        if (!post) throw new Exception('post not found')
        return res.status(statusCodes.OK).send({ message: 'unlike successful' })
    } catch (error) {
        next(error)
    }
}

const getLengthPosts = async (req, res, next) => {
    try {
        const length = await Post.estimatedDocumentCount()
        return res.status(statusCodes.OK).send({ length })
    } catch (error) {
        next(error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        let { skip = 0, limit = 5, byUser } = req.query
        const authId = req.auth._id
        skip = +skip
        limit = +limit
        let query = {}
        if (byUser) {
            query.byUser = byUser
        }
        let posts = await Post.find(query, null, { skip, limit })
            .sort({ createdAt: -1 })
            .populate('byUser', 'username avatarUrl')
        if (!posts) throw new Exception('Posts not found', statusCodes.NOT_FOUND)
        posts = await Promise.all(posts.map(async post => {
            const canLike = !post.checkUserIsLiked(authId)
            const commentCount = await post.getCommentCount()
            // console.log(post.values())
            return { ...post.values(), canLike, commentCount }
        }))
        return res.status(statusCodes.OK).send({ posts })
    } catch (error) {
        next(error)
    }
}

const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params
        const authId = req.auth._id
        const post = await Post.findById(id).populate('byUser', 'username avatarUrl')
        if (!post) throw new Exception('post not found', statusCodes.NOT_FOUND)
        const canLike = !post.checkUserIsLiked(authId)
        const commentCount = await post.getCommentCount()
        return res.status(statusCodes.OK).send({ ...post._doc, canLike, commentCount })
    } catch (error) {
        next(error)
    }
}

const mockUpload = (req, res) => {
	res.status(statusCodes.OK).send({
		"name": "xxx.png",
		"status": "done",
		"url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
		"thumbUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
	})
}




module.exports = {
    addNewPost,
    getPosts,
    getPostById,
    likePost,
    unlikePost,
    getLengthPosts,
    mockUpload
}
