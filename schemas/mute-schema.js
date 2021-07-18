const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};

const muteSchema = mongoose.Schema(
  {
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    curRoles: {
      type: String,
      default: '',
    },
    expires: {
      type: Number,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
    timesMuted: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('mutes', muteSchema);
