const express = require('express')
const router = express.Router()
const verifytoken = require('../middleware/verify-token')
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
router.post('/', verifytoken, async function (req, res) {
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
    }})
/*
// not done - index 
router.get('/', async function (req, res) {
    try {
        posts = await Post.find({})
    } catch
})
//find one
router.get('/:postId', async function (req, res) {
    try {
        post = await Post.findById(req.params.postId)
        res.json(post)
    } catch {


    }
})
*/
module.exports = router