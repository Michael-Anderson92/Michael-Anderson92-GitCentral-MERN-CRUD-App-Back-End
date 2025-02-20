const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    commenter: { //username of commenter
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true,
        maxLength: 350 // max of 350 characters
    }
})

module.exports = mongoose.model('Comment', commentSchema)