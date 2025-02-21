const express = require('express');
const router = express.Router();

const Forum = require('../models/forums')

const verifyToken = require('../middleware/verify-token');



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
    try {
        //allowing forums to have same title, but not by same account

        const forumsByUser = await Forum.findOne({ forumTitle })
        if (forumsByUser) {
            res.status(409).json('sorry! but you already have a forum with that same title')
        }
        console.log(req.body) //double check here
        const forum = await Forum.create({
            userId: req.user._id,
            creater: req.user.username,
            ...req.body //emptys key value pairs form req.body into this object
        })
        res.json(forum)
    } catch(err) {
        res.status(500).json({err: err.message})
    }
})

/*

//index - no token
router.get('/', async function (req, res) {
    try {
        const allForums = await Forum.findAll({})
        res.json(allForums)
        console.log('allforms! i hope this works')
    } catch (err) {
        res.status(500).json({ err: err.message })
        console.log('look at index routing on forum')
    }
})
//get Id
router.get('/:forurmsId', async function (req, res) {
    try {
        const selectedForum = await Forum.findById(req.params.forurmsId)
        res.json(selectedForum)
        console.log(selectedForum)
    } catch (err) {
        res.status(500).json({ err: err.message })
        console.log('look at form id get request')
    }
})
*/
module.exports = router