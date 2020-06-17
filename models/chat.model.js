const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types
const chatSchema = new Schema({
    host: {
        type: [ObjectId],
        required: true
    },
    toUser: {
        type: [ObjectId],
        required: true
    },
}, {timestamps: true})

module.exports = model('Chat', chatSchema)