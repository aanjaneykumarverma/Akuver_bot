const muteSchema = require('../../schemas/mute-schema.js');

module.exports = {
  name: 'unmute',
  description: 'Unmutes a user.',
  usage: ' @user',
  permissions: 'ADMINISTRATOR',
  async: true,
  guildOnly: true,
  async execute(message, args) {
    const { guild } = message;
    if (args.length != 1) {
      message.reply(`Please use correct syntax: !unmute <@Target>`);
      return;
    }
    let id = '';
    const target = message.mentions.users.first();
    if (!target) {
      message.reply('Please specify someone to unmute.');
      return;
    }
    id = target.id;
    try {
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
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};
