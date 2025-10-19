const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const Episode = require('../models/Episode');
const Season = require('../models/Season');
const Content = require('../models/Content');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id })
      .populate({
        path: 'episodeId',
        populate: {
          path: 'seasonId',
          populate: {
            path: 'contentId',
          },
        },
      });

    const groupedProgress = {};
    progress.forEach((item) => {
      const contentId = item.episodeId.seasonId.contentId._id.toString();
      if (!groupedProgress[contentId]) {
        groupedProgress[contentId] = {
          content: item.episodeId.seasonId.contentId,
          watchedCount: 0,
        };
      }
      groupedProgress[contentId].watchedCount++;
    });

    res.json(Object.values(groupedProgress));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:contentId', protect, async (req, res) => {
  try {
    const seasons = await Season.find({ contentId: req.params.contentId });
    const seasonIds = seasons.map((s) => s._id);
    const episodes = await Episode.find({ seasonId: { $in: seasonIds } });
    const episodeIds = episodes.map((e) => e._id);

    const progress = await Progress.find({
      userId: req.user._id,
      episodeId: { $in: episodeIds },
    }).populate('episodeId');

    res.json(progress.map((p) => p.episodeId));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/toggle', protect, async (req, res) => {
  try {
    const { episodeId } = req.body;

    const existingProgress = await Progress.findOne({
      userId: req.user._id,
      episodeId,
    });

    if (existingProgress) {
      await Progress.deleteOne({ _id: existingProgress._id });
      return res.json({ message: 'Progress removed', watched: false });
    }

    const progress = await Progress.create({
      userId: req.user._id,
      episodeId,
    });

    res.status(201).json({ message: 'Progress saved', watched: true, progress });
  } catch (error) {
    res.status(400).json({ message: 'Error toggling progress', error: error.message });
  }
});

module.exports = router;