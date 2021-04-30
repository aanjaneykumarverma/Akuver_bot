const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setticket',
  description: 'Sets(changes) the ticket channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const ticket = args[0];
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            ticket: ticket,
          },
          {
            upsert: true,
          }
        );
        message.reply(`The ticket channel for this server is ${ticket} now.`);
        updateCache(guildId, 'setticket', ticket);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
