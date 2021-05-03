const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setwelcome',
  description: 'Sets(changes) the welcome channel for this server',
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
        const welcome = channel.id.toString();
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            welcome: welcome,
          },
          {
            upsert: true,
          }
        );
        message.reply(`The welcome channel for this server is ${channel} now.`);
        updateCache(guildId, 'setwelcome', welcome);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
