const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setwelcome',
  description: 'Sets(changes) the welcome channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const welcome = args[0];
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            welcome: welcome,
          },
          {
            upsert: true,
          }
        );
        message.reply(`The welcome channel for this server is ${welcome} now.`);
        updateCache(guildId, 'setwelcome', welcome);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
