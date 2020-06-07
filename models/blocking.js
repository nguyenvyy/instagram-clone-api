const { Schema, model } = require('mongoose') 
const {ObjectId} = Schema.Types
const blockingSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        index: true 
    },
    follower: {
        type: ObjectId,
        ref: 'User',
        index: true
    }
}, {timestamps: true})

blockingSchema.methods.values = function() {
 
}

module.exports = model('Blocking', blockingSchema)