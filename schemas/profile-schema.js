const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};

const defNumber = {
  type: Number,
  default: 0,
};
const profileSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  xp: defNumber,
  level: defNumber,
  coins: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('profiles', profileSchema)    // profiles is the table name
