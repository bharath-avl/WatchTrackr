const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const Season = require('../models/Season');

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const content = await Content.find(filter).sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id/seasons', async (req, res) => {
  try {
    const seasons = await Season.find({ contentId: req.params.id }).sort({ seasonNumber: 1 });
    res.json(seasons);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const content = await Content.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ message: 'Error creating content', error: error.message });
  }
});

module.exports = router;