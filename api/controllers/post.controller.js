const Post = require('../../models/post.model')
const Notification = require('../../models/notification.model')
const { statusCodes } = require('../../config/globals')
const { Exception } = require('../../utils')
const addNewPost = async (req, res, next) => {
    try {
        const {byUser, caption, imageUrl} = req.body
        const post = new Post({byUser, caption, imageUrl})
        await post.save()
        return res.status(statusCodes.OK).send({post})
    } catch (error) {
        next(error)
    }
}

const likePost = async (req, res, next) => {
    try {
        const {id} = req.params
        const authId = req.auth._id
        const {likedUserId} = req.body
        if(authId !== likedUserId) throw new Exception('invalid likedUserId')
        const post = await Post.findOneAndUpdate({_id: id, likeByIds: {$nin: likedUserId}}, {$push: {likeByIds: likedUserId}}, {new: true})
        //check post not found or user liked
        if(!post) throw new Exception('post not found or user liked')
        // add notification for post author
        const notification = new Notification({
            toUserId: post._doc.byUser, 
            byUser: likedUserId, 
            byPostId: post._id,
            action: 'like'
        })
        await notification.save()
        return res.status(statusCodes.OK).send({post})
    } catch (error) {
        next(error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        let {page = 0, limit = 5, byUser} = req.query
        const authId = req.auth._id
        page = +page
        limit = +limit
        let query = {}
        if(byUser) {
            query.byUser = byUser
        }
        const skip = limit * page
        let posts = await Post.find(query, null, {skip, limit}).sort({createdAt: -1})
        if(!posts) throw new Exception('Posts not found', statusCodes.NOT_FOUND)
        posts = await Promise.all(posts.map(async post => {
            const canLike = !post.checkUserIsLiked(authId)
            const commentCount = await post.getCommentCount()
            return {...post._doc, canLike, commentCount}
        }))
        return res.status(statusCodes.OK).send({posts})
    } catch (error) {
        next(error)
    }
}

const getPostById = async (req, res, next) => {
    try {
        const {id} = req.params
        const authId = req.auth._id
        const post = await Post.findById(id)    
        if(!post) throw new Exception('post not found', statusCodes.NOT_FOUND)
        const canLike = !post.checkUserIsLiked(authId)
        const commentCount = await post.getCommentCount()
        return res.status(statusCodes.OK).send({...post._doc, canLike, commentCount})
    } catch (error) {
        next(error)
    }
}




module.exports = {
    addNewPost, 
    getPosts,
    getPostById,
    likePost
}
