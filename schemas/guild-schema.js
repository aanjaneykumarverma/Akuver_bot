const mongoose = require('mongoose');
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
  prefix: reqString,
  welcome: defString,
  rules: defString,
  role: defString,
  ticket: defString,
  polls: defString,
  leave: defString,
  level: defString,
});

module.exports = mongoose.model('guildInfo', guildSchema);
