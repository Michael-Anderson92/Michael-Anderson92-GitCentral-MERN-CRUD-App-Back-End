const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: True
    },

    createdAt: {
        type: Date,
        required: True,
        default: Date.now()
    },

    contents: {
        type: String,
        required: True
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }



})

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel