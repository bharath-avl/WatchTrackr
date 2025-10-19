const express = require('express');
const router = express.Router();
const Season = require('../models/Season');
const Episode = require('../models/Episode');

router.get('/:id/episodes', async (req, res) => {
  try {
    const episodes = await Episode.find({ seasonId: req.params.id }).sort({ episodeNumber: 1 });
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const season = await Season.create(req.body);
    res.status(201).json(season);
  } catch (error) {
    res.status(400).json({ message: 'Error creating season', error: error.message });
  }
});

module.exports = router;