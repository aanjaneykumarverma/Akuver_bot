const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setticket',
  description: 'Sets(changes) the ticket channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  usage: ' Channel tag',
  guildOnly: true,
  async execute(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a valid channel.');
    }

    try {
      const guildId = message.guild.id;
      const ticket = channel.id.toString();
      await guildSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          _id: guildId,
          ticket: ticket,
        },
        {
          upsert: true,
        }
      );
      message.reply(`The ticket channel for this server is ${channel} now.`);
      updateCache(guildId, 'setticket', ticket);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};
