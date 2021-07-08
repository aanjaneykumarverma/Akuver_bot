const { MessageAttachment } = require('discord.js');
module.exports = {
  name: 'servericon',
  description: 'Displays the server icon!',
  usage: ' ',
  category: 'Image',
  cooldown: 8,
  guildOnly: true,
  execute(message, args) {
    const icon = message.guild.iconURL({ dynamic: true, size: 1024 });
    const attachment = new MessageAttachment(icon);
    message.channel.send('', attachment);
  },
};
