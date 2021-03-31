const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};

const amongUsCategorySchema = mongoose.Schema({
  // guildId
  _id: reqString,
  categoryId: reqString,
});

module.exports = mongoose.model('among-us-categories', amongUsCategorySchema);
