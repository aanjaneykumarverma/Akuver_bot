const guildSchema = require('../../schemas/guild-schema');
const { updateCache } = require('../../util/update');
const factory = require('../../util/factory');

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
    const guildId = message.guild.id;
    const polls = channel.id.toString();
    await factory.updateOne(
      guildSchema,
      { _id: guildId },
      { _id: guildId, polls }
    );
    message.reply(`The polls channel for this server is ${channel} now.`);
    updateCache(guildId, 'setpoll', polls);
  },
};
