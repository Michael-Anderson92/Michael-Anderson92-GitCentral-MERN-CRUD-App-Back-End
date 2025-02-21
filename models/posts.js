const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({

    commentUsername: { //username of commenter
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    commentContents: {
        type: String,
        required: true,
        maxLength: 600 // max of 600 characters
    },
    commentLikes: {
        type: Number,
        default: 0
    }
})

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    postContents: {
        type: String,
        required: true
    },
    postLikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [commentSchema],
        default: []
    }

})

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel