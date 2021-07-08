const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Displays the avatar of the user',
  usage: ' @user(optional)',
  category: 'Image',
  cooldown: 8,
  guildOnly: true,
  execute(message, args) {
    const target = message.mentions.members.first() || message.author;
    const avatar = target.user.displayAvatarURL({
      dynamic: false,
      format: 'png',
      size: 1024,
    });
    const attachment = new MessageAttachment(avatar);
    message.channel.send('', attachment);
  },
};
