const scheduledSchema = require('../schemas/scheduled-schema');
const factory = require('../util/factory');
module.exports.async = true;
module.exports = async (client) => {
  const checkForPosts = async () => {
    const filter = {
      date: {
        $lte: Date.now(),
      },
    };

    const results = await factory.getAll(scheduledSchema, filter);

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

    await factory.deleteAll(scheduledSchema, filter);

    setTimeout(checkForPosts, 1000 * 10);
  };
  await checkForPosts();
};
