const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
    toUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    byPostId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'like', 
            'like_comment',
            'comment', 
            'reply_comment', 
            'follow',
            'un_follow',
        ]
    }
}, {timestamps: true})

reactionSchema.methods.values = function() {
	
}

module.exports = model('Reaction', reactionSchema)