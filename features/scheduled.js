const scheduledSchema = require('../schemas/scheduled-schema.js');
module.exports.async = true;
module.exports = async (client) => {
  const checkForPosts = async () => {
    const query = {
      date: {
        $lte: Date.now(),
      },
    };

    try {
      const results = await scheduledSchema.find(query);
      for (const post of results) {
        const { guildId, channelId, content } = post;
        const guild = await client.guilds.fetch(guildId);
        if (!guild) {
          continue;
        }
        const channel = guild.channels.cache.get(channelId);
        if (!channel) {
          continue;
        }
        channel.send(content);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const results = await scheduledSchema.deleteMany(query);
    } catch (err) {
      console.log(err.message);
    }
    setTimeout(checkForPosts, 1000 * 10);
  };
  await checkForPosts();
};
