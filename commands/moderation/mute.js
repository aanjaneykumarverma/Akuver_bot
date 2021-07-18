const muteSchema = require('../../schemas/mute-schema');
const factory = require('../../util/factory');

const reasons = {
  SPAMMING: 5,
  ADVERTISING: 24,
};

module.exports = {
  name: 'mute',
  description: 'Mutes a user',
  usage: ' @user reason',
  category: 'Moderation',
  permissions: 'ADMINISTRATOR',
  async: true,
  guildOnly: true,
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

    const previousMute = await factory.getOne(muteSchema, {
      userId: target.id,
    });

    console.log(previousMute);

    const currentlyMuted = previousMute ? previousMute.current : false;
    const muteCount = previousMute ? previousMute.timesMuted : 0;

    console.log(currentlyMuted);
    if (currentlyMuted) return message.reply('That user is already muted.');

    let duration = reasons[reason] * (muteCount + 1);
    let expires = new Date();
    expires.setHours(expires.getHours() + duration);
    expires = expires.valueOf();
    const mutedRole = guild.roles.cache.find((role) => {
      return role.name === 'Muted';
    });

    if (!mutedRole) return message.reply('Could not find a "Muted" role.');

    const targetMember = (await guild.members.fetch()).get(target.id);
    let curRoles = '';
    guild.roles.cache.find((role) => {
      if (
        role.name !== 'Muted' &&
        role.name !== '@everyone' &&
        targetMember.roles.cache.has(role.id)
      ) {
        curRoles += `${role.name},`;
        targetMember.roles.remove(role);
      }
    });
    curRoles = curRoles.substr(0, curRoles.length - 1);
    targetMember.roles.add(mutedRole);

    const data = {
      userId: target.id,
      guildId: guild.id,
      reason,
      staffId: staff.id,
      staffTag: staff.username,
      curRoles,
      expires,
      current: true,
      timesMuted: muteCount + 1,
    };

    if (!previousMute) {
      await factory.createOne(muteSchema, data);
    } else {
      await factory.updateOne(
        muteSchema,
        {
          guildId: guild.id,
          userId: target.id,
        },
        data
      );
    }

    message.reply(
      `You muted <@${target.id}> for "${reason}". They will be unmuted in ${duration} hours.`
    );
  },
};
