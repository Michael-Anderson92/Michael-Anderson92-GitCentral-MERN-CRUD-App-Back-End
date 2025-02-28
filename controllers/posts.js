const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const Post = require('../models/posts');

// Create a new post (authenticated)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newPost = await Post.create({
      userId: req.user._id,
      creator: req.user.username,
      ...req.body,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post by ID (public)
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post (authenticated)
router.put('/:postId', verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { ...req.body, userId: req.user._id }, // Ensure userId stays tied to creator
      { new: true } // Return the updated document
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post (authenticated)
router.delete('/:postId', verifyToken, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;