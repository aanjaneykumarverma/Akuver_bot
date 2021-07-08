const guildSchema = require('../../schemas/guild-schema');
const { updateCache } = require('../../util/update');
const factory = require('../../util/factory');

module.exports = {
  name: 'setrole',
  description: 'Sets(changes) the role-claim channel for this server',
  category: 'SetChannels',
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
    const role = channel.id.toString();
    await factory.updateOne(
      guildSchema,
      { _id: guildId },
      { _id: guildId, role }
    );
    message.reply(`The role-claim channel for this server is ${channel} now.`);
    updateCache(guildId, 'setrole', role);
  },
};
