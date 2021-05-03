const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setpoll',
  description: 'Sets(changes) the polls channel for this server',
  permissions: 'ADMINISTRATOR',
  usage: ' Channel tag',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a valid channel.');
    }
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const polls = channel.id.toString();
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            polls: polls,
          },
          {
            upsert: true,
          }
        );
        message.reply(`The polls channel for this server is ${channel} now.`);
        updateCache(guildId, 'setpoll', polls);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
