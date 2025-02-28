const express = require('express');
const router = express.Router();
const Forum = require('../models/forums');
const verifyToken = require('../middleware/verify-token');

// POST /forums - Create a new forum (requires token)
router.post('/', verifyToken, async function (req, res) {
  try {
    console.log('User:', req.user);
    console.log('Request body:', req.body);

    const forumData = {
      userId: req.user._id,
      creator: req.user.username,
      title: req.body.title, // Map to 'title' from schema
      contents: req.body.contents || '', // Optional, defaults to empty
    };

    const forum = await Forum.create(forumData);
    res.status(201).json(forum);
  } catch (err) {
    console.error('Error creating forum:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message }); // e.g., title length
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /forums - Fetch all forums (no token needed)
router.get('/', async function (req, res) {
  try {
    const forums = await Forum.find({});
    res.json(forums);
    console.log('Fetched all forums:', forums);
  } catch (err) {
    console.error('Error fetching forums:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /forums/:forumsId - Fetch a specific forum (no token needed)
router.get('/:forumsId', async function (req, res) {
  try {
    const selectedForum = await Forum.findById(req.params.forumsId);
    if (!selectedForum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.json(selectedForum);
    console.log('Fetched forum:', selectedForum);
  } catch (err) {
    console.error('Error fetching forum:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /forums/:forumsId - Edit a forum (requires token)
router.put('/:forumsId', verifyToken, async function (req, res) {
  try {
    const forumEdit = await Forum.findByIdAndUpdate(
      req.params.forumsId,
      { title: req.body.title, contents: req.body.contents }, // Update allowed fields
      { new: true, runValidators: true }
    );
    if (!forumEdit) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.json(forumEdit);
    console.log('Updated forum:', forumEdit);
  } catch (err) {
    console.error('Error updating forum:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE /forums/:forumsId - Delete a forum (requires token)
router.delete('/:forumsId', verifyToken, async function (req, res) {
  try {
    const deletedForum = await Forum.findByIdAndDelete(req.params.forumsId);
    if (!deletedForum) {
      return res.status(404).json({ error: 'Forum not found' });
    }
    res.json(deletedForum);
    console.log('Deleted forum:', deletedForum);
  } catch (err) {
    console.error('Error deleting forum:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;