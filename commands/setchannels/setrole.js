const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setrole',
  description: 'Sets(changes) the role-claim channel for this server',
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
        const role = channel.id.toString();
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            role: role,
          },
          {
            upsert: true,
          }
        );
        message.reply(
          `The role-claim channel for this server is ${channel} now.`
        );
        updateCache(guildId, 'setrole', role);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
