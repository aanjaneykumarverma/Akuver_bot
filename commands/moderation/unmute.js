const mongo = require('../../util/mongo.js');
const muteSchema = require('../../schemas/mute-schema.js');

module.exports = {
  name: 'unmute',
  description: 'Unmutes a user.',
  usage: '[@USER]',
  permissions: 'ADMINISTRATOR',
  async execute(message, args) {
    const { guild } = message;
    if (args.length != 1) {
      message.reply(`Please use correct syntax: !unmute <@Target>`);
      return;
    }
    let id = '';
    const target = message.mentions.users.first();
    if (!target) {
      message.reply('Please specify someone to mute.');
      return;
    }
    id = target.id;
    const mongoose = await mongo();
    const result = await muteSchema.updateOne(
      {
        guildId: guild.id,
        userId: id,
        current: true,
      },
      {
        current: false,
      }
    );
    const resultnew = await muteSchema.find({
      guildId: guild.id,
      userId: id,
    });
    if (result.nModified === 1) {
      const mutedRole = guild.roles.cache.find((role) => {
        return role.name === 'Muted';
      });
      if (mutedRole) {
        const guildMember = guild.members.cache.get(id);
        let roles = resultnew[0].curRoles;
        roles = roles.split(',');
        for (const role of roles) {
          guild.roles.cache.find((Role) => {
            if (Role.name == role) {
              guildMember.roles.add(Role);
              return;
            }
          });
        }
        guildMember.roles.remove(mutedRole);
      }
      message.reply(`You unmuted <@${id}>.`);
    } else {
      message.reply('That user is not muted.');
    }
    mongoose.connection.close();
  },
};
