const { Schema, model } = require('mongoose')
const { ObjectId, String } = Schema.Types
const messageSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true, 
        required: true
    },
    chatIds: {
        type: [ObjectId],
        required: true
    }
}, {timestamps: true})

messageSchema.methods.values = function() {
	
}

module.exports = model('Message', messageSchema)