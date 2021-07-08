const { MessageAttachment } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'stonk',
  description: "Converts a user's avatar in stonk meme !!",
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

    let img = await new DIG.Stonk().getImage(avatar);

    let attach = new MessageAttachment(img, 'stonk.png');

    message.channel.send(attach);
  },
};
