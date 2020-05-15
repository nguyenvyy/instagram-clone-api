const { Schema, model } = require('mongoose')

const notificationSchema = new Schema({
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
        enum: ['like', 'comment']
    }
}, {timestamps: true})

module.exports = model('Notification', notificationSchema)