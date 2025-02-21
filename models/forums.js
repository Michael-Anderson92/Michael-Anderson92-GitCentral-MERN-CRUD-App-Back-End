const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    forumUsername: {
        type: { //not sure if this is rigt
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    forumTitle: {
        type: String,
        required: true,
        minLength: 30,
        maxLength: 100,
    },
    forumContents: {
        type: String,
        default: ''

    },
    posts: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        default: []
    },
    forumLikes: {
        type: Number,
        default: 0
    }
})


const ForumModel = mongoose.model('Forum', forumSchema)
module.exports = ForumModel