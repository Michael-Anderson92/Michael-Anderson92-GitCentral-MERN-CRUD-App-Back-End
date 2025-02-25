const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    
    creator: { //username of commenter
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now //look into time zone
    },
    contents: {
        type: String,
        required: true,
        maxLength: 600 // max of 600 characters
    },
    likes: {
        type: Number,
        default: 0
    }
})

const PostSchema = new mongoose.Schema({
    forum: { //verify forum key is getting sent when post is created
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forum',
        required: true
    },
    creator:{
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    contents: {
        type: String,
        required: true
    },
    likes: {
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