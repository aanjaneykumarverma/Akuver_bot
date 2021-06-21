const guildSchema = require('../../schemas/guild-schema');
const { updateCache } = require('../../util/update');
const factory = require('../../util/factory');

module.exports = {
  name: 'setleave',
  description: 'Sets(changes) the leave channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  usage: ' Channel tag',
  guildOnly: true,
  async execute(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a valid channel.');
    }
    const guildId = message.guild.id;
    const leave = channel.id.toString();
    await factory.updateOne(
      guildSchema,
      { _id: guildId },
      { _id: guildId, leave }
    );
    message.reply(`The leave channel for this server is ${channel} now.`);
    updateCache(guildId, 'setleave', leave);
  },
};
