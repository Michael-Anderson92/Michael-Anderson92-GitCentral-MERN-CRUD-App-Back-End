const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: True
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },

    contents: {
        type: Date,
        required: True
    }



})

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel