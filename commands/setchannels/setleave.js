const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setleave',
  description: 'Sets(changes) the leave channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const leave = args[0];
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            leave: leave,
          },
          {
            upsert: true,
          }
        );
        message.reply(`The leave channel for this server is ${leave} now.`);
        updateCache(guildId, 'setleave', leave);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
