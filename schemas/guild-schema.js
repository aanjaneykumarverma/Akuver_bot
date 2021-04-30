const mongoose = require('mongoose');
const prefix = require('../config.json');
const reqString = {
  type: String,
  required: true,
};
const defString = {
  type: String,
  default: '',
};
const guildSchema = mongoose.Schema({
  _id: reqString, // guildId
  prefix: {
    type: String,
    default: prefix,
  },
  welcome: defString,
  rules: defString,
  role: defString,
  ticket: defString,
  polls: defString,
  leave: defString,
});

module.exports = mongoose.model('guildInfo', guildSchema);
