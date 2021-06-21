const guildSchema = require('../../schemas/guild-schema');
const { updateCache } = require('../../util/update');
const factory = require('../../util/factory');

module.exports = {
  name: 'setprefix',
  description: 'Changes the prefix for commands for this server.',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  usage: ' Prefix',
  guildOnly: true,
  async execute(message, args) {
    if (!args.length) {
      return message.reply('Please provide a prefix.');
    }
    const guildId = message.guild.id;
    const prefix = args[0];
    await factory.updateOne(
      guildSchema,
      { _id: guildId },
      { _id: guildId, prefix }
    );
    message.reply(`The prefix for this bot is ${prefix} now.`);
    updateCache(guildId, 'setprefix', prefix);
  },
};
