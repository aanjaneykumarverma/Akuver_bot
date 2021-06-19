const mongo = require('../util/mongo.js');
const { loadData } = require('../util/update.js');
const fs = require('fs');
const featuresFiles = fs
  .readdirSync('./features')
  .filter((file) => file.endsWith('.js'));
module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log("I'm ready now!");
    mongo();
    await loadData(client);
    for (const file of featuresFiles) {
      const feature = require(`../features/${file}`);
      if (feature.async) {
        await feature(client);
      } else {
        feature(client);
      }
    }
  },
};
