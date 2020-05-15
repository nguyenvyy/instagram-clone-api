const { Schema, model } = require('mongoose')
const commentSchema = new Schema({
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})
module.exports = model('Comment', commentSchema)