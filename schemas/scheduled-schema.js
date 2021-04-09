const mongoose = require('mongoose');
const reqString = {
  type: String,
  required: true,
};

const scheduledSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  content: reqString,
  guildId: reqString,
  channelId: reqString,
});

module.exports = mongoose.model('scheduled-posts', scheduledSchema);
