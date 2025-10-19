const express = require('express');
const router = express.Router();
const Episode = require('../models/Episode');

router.post('/', async (req, res) => {
  try {
    const episode = await Episode.create(req.body);
    res.status(201).json(episode);
  } catch (error) {
    res.status(400).json({ message: 'Error creating episode', error: error.message });
  }
});

module.exports = router;