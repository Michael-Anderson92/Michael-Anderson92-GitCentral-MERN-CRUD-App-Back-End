/*const Post = require('../models/posts')
const verifyToken = require('../middleware/verify-token')
const express = require('express')
const router = express.Router()

router.post('/', verifyToken, async function (req, res) {
    console.log(req.body)
    console.log(req.params.postId)

    try {
        const postId = req.params.postId
    
        const newComment = ({
            postId: postId,
            commenterId: req.user._id,
            commenter: req.user.username,
            ...req.body
        })
        Post.comments.push(newComment)
        await Post.save()
        res.status(201).json(newComment)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }

})

router.get('/', async function(req,res){

})

router.get('/:commentId')









module.exports = router
// mounts routes on server so server can listen to all 
// requests

*/
