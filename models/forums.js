const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
    },
    contents: {
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
    likes: {
        type: Number,
        default: 0
    }
})


const ForumModel = mongoose.model('Forum', forumSchema)
module.exports = ForumModel