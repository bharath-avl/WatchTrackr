const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['TV Show', 'Movie', 'Anime', 'Web Series'],
      required: true,
    },
    description: {
      type: String,
    },
    year: {
      type: Number,
    },
    genre: {
      type: String,
    },
    poster: {
      type: String,
    },
    backdrop: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Content', contentSchema);