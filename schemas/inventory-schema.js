const mongoose = require('mongoose');

const defNumber = {
  type: Number,
  default: 0,
  min: [0, 'Items cannot be negative!'],
};

const reqString = {
  type: String,
  required: true,
};

const inventorySchema = {
  guildId: reqString,
  userId: reqString,
  vip: defNumber,
  car: defNumber,
  mansion: defNumber,
  jetski: defNumber,
};

module.exports = mongoose.model('inventory', inventorySchema);
