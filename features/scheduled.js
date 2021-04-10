const scheduledSchema = require('../schemas/scheduled-schema.js');
const checkForPosts = async () => {
  const query = {
    date: {
      $lte: Date.now(),
    },
  }
  const results = await scheduledSchema.find(query);
  for(const post of results){
    const {guildId, channelId, content} = post;
    const guild = await client.guilds.fetch(guildId);
    if(!guild){
      continue;
    }
    const channel = guild.channels.cache.get(channelId);
    if(!channel){
      continue;
    }
    channel.send(content);
  }
  await scheduledSchema.deleteMany(query);
  setTimeout(checkForPosts, 1000*1);
};
module.exports = (client) => {};

module.exports.checkForPosts = checkForPosts;
