// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const saltRounds = 12;

console.log('JWT_SECRET:', process.env.JWT_SECRET);

router.post('/sign-up', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing username
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Check for existing email
    const emailInDatabase = await User.findOne({ email });
    if (emailInDatabase) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Create user with hashed password
    const user = await User.create({
      username,
      email,
      hashedPassword: bcrypt.hashSync(password, saltRounds),
      posts: [],
    });
    console.log('Account created', user);

    // Generate JWT
    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Sign-up error:', err);
    res.status(500).json({ error: 'Server error during sign-up' });
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordCorrect = bcrypt.compareSync(password, user.hashedPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = { username: user.username, _id: user._id };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Sign-in error:', err);
    res.status(500).json({ error: 'Server error during sign-in' });
  }
});

module.exports = router;