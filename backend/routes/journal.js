const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Journal = require('../models/Journal');
const { analyzeSentiment } = require('../utils/sentiment');

// Create journal entry
router.post('/', authMiddleware, async (req, res) => {
  const { text, tags = [] } = req.body;
  try {
    const mood = analyzeSentiment(text);
    const entry = await Journal.create({ user: req.user, text, tags, mood });
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create entry' });
  }
});

// Get all entries
router.get('/', authMiddleware, async (req, res) => {
  try {
    const entries = await Journal.find({ user: req.user }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve entries' });
  }
});

// Search entries
router.get('/search', authMiddleware, async (req, res) => {
  const { mood, keyword } = req.query;
  const filter = { user: req.user };
  if (mood) filter.mood = mood;
  if (keyword) filter.text = { $regex: keyword, $options: 'i' };

  try {
    const entries = await Journal.find(filter).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
