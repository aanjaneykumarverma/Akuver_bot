const mongo = require('../../util/mongo.js');
const guildSchema = require('../../schemas/guild-schema.js');
const { updateCache } = require('../../util/update.js');
module.exports = {
  name: 'setrule',
  description: 'Sets(changes) the rules and info channel for this server',
  permissions: 'ADMINISTRATOR',
  cooldown: 20,
  usage: ' Channel tag',
  guildOnly: true,
  async execute(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply('Please mention a valid channel.');
    }
    await mongo().then(async (mongoose) => {
      try {
        const guildId = message.guild.id;
        const rules = channel.id.toString();
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
          `The rules and info channel for this server is ${channel} now.`
        );
        updateCache(guildId, 'setrule', rules);
      } catch (err) {
        console.log(err.message);
        throw err;
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
