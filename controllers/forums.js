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
   
    console.log(req.user, "req.user here")
    try {
        //allowing forums to have same title, but not by same account
        console.log(req.user._id)

        
        console.log(req.body) //double check here
        const forum = await Forum.create({
            userId: req.user._id,
            creator: req.user.username,
            ...req.body //emptys key value pairs form req.body into this object
        })
        res.json(forum)
    } catch(err) {
       return res.status(500).json({err: err.message})
    }
})



//index - no token
router.get('/', async function (req, res) {
    try {
        const allForums = await Forum.find({})
        res.json(allForums)
        console.log('allforms! i hope this works')
    } catch (err) {
        res.status(500).json({ err: err.message })
        console.log('look at index routing on forum')
    }
})
//get Id - no token
router.get('/:forumsId', async function (req, res) {
    try {
        const selectedForum = await Forum.findById(req.params.forumsId)
        res.json(selectedForum)
        console.log(selectedForum)
    } catch (err) {
        res.status(500).json({ err: err.message })
        console.log('look at form id get request')
    }
})

module.exports = router