const { MessageAttachment } = require('discord.js');
const DIG = require('discord-image-generation');

module.exports = {
  name: 'trash',
  description: "Converts a user's avatar in trash meme !!",
  usage: ' @user',
  cooldown: 15,
  async execute(message, args) {
    const user = message.mentions.members.first();

    if (!user) return message.reply('Provide a user !!');

    const avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: 'png',
      size: 1024,
    });

    let img = await new DIG.Trash().getImage(avatar);

    let attach = new MessageAttachment(img, 'trash.png');

    message.channel.send(attach);
  },
};
