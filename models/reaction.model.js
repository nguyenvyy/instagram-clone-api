const { Schema, model } = require('mongoose')
const reactionTypes = require('../constants/reaction-types')

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
    },
    action: {
        type: String,
        required: true,
        enum: Object.values(reactionTypes)
    }
}, {timestamps: true})

reactionSchema.methods.values = function() {
	
}
module.exports = model('Reaction', reactionSchema)