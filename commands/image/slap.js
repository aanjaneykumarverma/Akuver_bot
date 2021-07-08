const { MessageAttachment } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'slap',
  description: 'Posts you slapping the mentioned user',
  usage: ' @user',
  category: 'Image',
  cooldown: 8,
  guildOnly: true,
  async execute(message, args) {
    const user = message.mentions.members.first();

    if (!user) return message.reply('Provide a user !!');

    const avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: 'png',
      size: 1024,
    });

    let img = await new DIG.Batslap().getImage(
      message.member.user.displayAvatarURL({
        dynamic: false,
        format: 'png',
        size: 1024,
      }),
      avatar
    );

    let attach = new MessageAttachment(img, 'slap.png');

    message.channel.send(attach);
  },
};
