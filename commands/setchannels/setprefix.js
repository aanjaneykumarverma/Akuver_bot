const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setprefix',
  description: 'Changes the prefix for commands for this server.',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
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
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
