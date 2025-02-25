const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verify-token')
const Post = require('../models/posts')


//verifytoken routes 
/*
- post forum
- edit forum
- delete forum

//no verify token needed
-get routes -index
-get routes by ID

*/
router.post('/', verifyToken, async function (req, res) {
    console.log(req.body)
    try {
        const newPost = await Post.create({
            userId: req.user._id,
            creator: req.user.username,
            ...req.body
        })
        console.log(newPost)
        res.json(newPost)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
})

// not done - index 
router.get('/', async function (req, res) {
    try {
        const posts = await Post.find({})
        res.json(posts)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})
//find one
router.get('/:postId', async function (req, res) {
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

//edit
router.put('/:postId', verifyToken, async function (req, res) {
    try {
        const postEdit = await Post.findByIdAndUpdate(req.params.postId, req.body)
        res.json(postEdit)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})
//delete
router.delete('/:postId', verifyToken, async function (req, res) {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId)
        res.json('deleted:',deletedPost)
    } catch (err) {
        res.status(500).json({err: err.message})
    }
})

module.exports = router