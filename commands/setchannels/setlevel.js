const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setlevel',
  description: 'Sets(changes) the level-logs channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  usage: ' Channel tag',
  guildOnly: true,
  async execute(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a valid channel.');
    }
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const level = channel.id.toString();
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            level: level,
          },
          {
            upsert: true,
          }
        );
        message.reply(
          `The level-logs channel for this server is ${channel} now.`
        );
        updateCache(guildId, 'setlevel', level);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
