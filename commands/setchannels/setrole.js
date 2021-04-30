const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setrole',
  description: 'Sets(changes) the role-claim channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  guildOnly: true,
  async execute(message, args) {
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const role = args[0];
        await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            role: role,
          },
          {
            upsert: true,
          }
        );
        message.reply(`The role-claim channel for this server is ${role} now.`);
        updateCache(guildId, 'setrole', role);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
