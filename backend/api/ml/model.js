/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  videoLinks: {
    type: [
      {content: String, link: String},
    ],
  },
});

module.exports = mongoose.model('Videos', videoSchema);
