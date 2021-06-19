const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
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

    try {
      const guildId = message.guild.id;
      const prefix = args[0];
      await guildSchema.findOneAndUpdate(
        {
          _id: guildId,
        },
        {
          _id: guildId,
          prefix: prefix,
        },
        {
          upsert: true,
        }
      );
      message.reply(`The prefix for this bot is ${prefix} now.`);
      updateCache(guildId, 'setprefix', prefix);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};
