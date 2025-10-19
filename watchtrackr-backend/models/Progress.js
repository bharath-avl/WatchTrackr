const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Episode',
      required: true,
    },
    watched: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.index({ userId: 1, episodeId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);