const mongo = require('../../util/mongo.js');
const muteSchema = require('../../schemas/mute-schema.js');

const reasons = {
  SPAMMING: 5,
  ADVERTISING: 24,
};

module.exports = {
  name: 'mute',
  description: 'Mutes a user',
  usage: ' @user reason',
  permissions: 'ADMINISTRATOR',
  async execute(message, args) {
    const { guild, author: staff } = message;
    if (args.length !== 2) {
      message.reply('Please mention a user & a reason to ban.');
      return;
    }
    const target = message.mentions.users.first();
    if (!target) {
      message.reply('Please specify someone to mute.');
      return;
    }
    const reason = args[1].toUpperCase();
    if (!reasons[reason]) {
      let validReasons = '';
      for (const key in reasons) {
        validReasons += '${key}, ';
      }
      validReasons = validReasons.substr(0, validReasons.length - 2);
      message.reply(
        'Unknown reason, please use one of the following ${validReasons}'
      );
      return;
    }
    const mongoose = await mongo();
    const previousMutes = await muteSchema.find({
      userId: target.id,
    });
    console.log(previousMutes);
    const currentlyMuted = previousMutes.filter((mute) => {
      return mute.current === true;
    });
    console.log(currentlyMuted);
    if (currentlyMuted.length) {
      message.reply('That user is already muted.');
      mongoose.connection.close();
      return;
    }
    let duration = reasons[reason] * (previousMutes.length + 1);
    const expires = new Date();
    expires.setHours(expires.getHours() + duration);
    const mutedRole = guild.roles.cache.find((role) => {
      return role.name === 'Muted';
    });
    if (!mutedRole) {
      message.reply('Could not find a "Muted" role.');
      mongoose.connection.close();
      return;
    }
    const targetMember = (await guild.members.fetch()).get(target.id);
    let curRoles = '';
    guild.roles.cache.find((role) => {
      if (
        role.name !== 'Muted' &&
        role.name !== '@everyone' &&
        targetMember.roles.cache.has(role.id)
      ) {
        curRoles += `${role.name} ,`;
        targetMember.roles.remove(role);
      }
    });
    curRoles = curRoles.substr(0, curRoles.length - 2);
    targetMember.roles.add(mutedRole);
    await new muteSchema({
      userId: target.id,
      guildId: guild.id,
      reason,
      staffId: staff.id,
      staffTag: staff.username,
      curRoles,
      expires,
      current: true,
    }).save();
    mongoose.connection.close();

    message.reply(
      `You muted <@${target.id}> for "${reason}". They will be unmuted in ${duration} hours.`
    );
  },
};
