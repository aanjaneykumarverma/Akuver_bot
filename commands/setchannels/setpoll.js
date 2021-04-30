const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setpoll',
  description: 'Sets(changes) the polls channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const polls = args[0];
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
        message.reply(`The polls channel for this server is ${polls} now.`);
        updateCache(guildId, 'setpoll', polls);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
