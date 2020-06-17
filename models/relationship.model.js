const { Schema, model } = require('mongoose') 
const {ObjectId, String} = Schema.Types
const relationshipSchema = new Schema({
    fromUser: {
        type: ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },
    withUser: {
        type: ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['follower', 'block']
    }
}, {timestamps: true})

relationshipSchema.methods.values = function() {
 
}

module.exports = model('Relationship', relationshipSchema)