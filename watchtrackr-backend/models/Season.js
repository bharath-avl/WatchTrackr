const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema(
  {
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
    },
    seasonNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Season', seasonSchema);