const { MessageAttachment } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'affect',
  description: "Converts a user's avatar in affect my baby meme !!",
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

    let img = await new DIG.Affect().getImage(avatar);

    let attach = new MessageAttachment(img, 'affect.png');

    message.channel.send(attach);
  },
};
