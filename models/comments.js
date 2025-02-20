const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    commenter: { //username of commenter
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
    
    contents: { 
        type: String,
        required: true,
        maxLength: 600 // max of 600 characters
    }
})

module.exports = mongoose.model('Comment', commentSchema)