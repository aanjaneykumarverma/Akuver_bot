const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setrule',
  description: 'Sets(changes) the rules and info channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const rules = args[0];
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            rules: rules,
          },
          {
            upsert: true,
          }
        );
        message.reply(
          `The rules and info channel for this server is ${rules} now.`
        );
        updateCache(guildId, 'setrule', rules);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
