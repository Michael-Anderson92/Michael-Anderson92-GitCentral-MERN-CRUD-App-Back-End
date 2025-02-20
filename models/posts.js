const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },

    contents: {
        type: String,
        required: true
    },
    comments: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
        }],
        default: []
      }

})

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel