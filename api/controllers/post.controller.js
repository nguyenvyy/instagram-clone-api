const Post = require('../../models/post.model')
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
        const {likedUserId} = req.body
        const post = await Post.findByIdAndUpdate(id, {$addToSet: {likeByIds: likedUserId}}, {new: true})
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
        posts = posts.map(post => {
            const canLike = !post.checkUserIsLiked(authId)
            return {...post._doc, canLike}
        })
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
        return res.status(statusCodes.OK).send({...post._doc, canLike})
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
