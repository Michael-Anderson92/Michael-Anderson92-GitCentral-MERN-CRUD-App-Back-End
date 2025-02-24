const express = require('express');
const router = express.Router();

const User = require('../models/users');

const verifyToken = require('../middleware/verify-token');


// examples of authenticating controller routes
router.get('/', verifyToken, async (req, res) => {
  // verifyToken defines req.user!
  // you have access to req.user.username
  // req.user._id
  try {
    // only return the username property on all the users
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:userId', verifyToken, async (req, res) => { //come back later
  console.log(req.params.UserId, 'paramas')
  try {
    if (req.User._id !== req.params.userId){
      return res.status(403).json({ err: "Unauthorized"});
    }

    const User = await User.findById(req.params.userId);

    if (!User) {
      return res.status(404).json({ err: 'User not found.'});
    }

    res.json({ User });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
