const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'qr',
  description: 'Converts the provided link to a QR code',
  usage: ' Link(should be https) ',
  category: 'Utility',
  execute(message, args) {
    let link = args[0];
    let qrLink = `http://api.qrserver.com/v1/create-qr-code/?data=${link}&size=200x200`;
    if (!link) {
      return message.channel.send('Please provide a link!');
    }
    if (require('is-url')(link)) {
      const attachment = new MessageAttachment(qrLink, 'qrcode.png');
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('QR Code')
        .attachFiles(attachment)
        .setImage('attachment://qrcode.png')
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();

      message.channel.send(embed);
    } else {
      message.reply("Error! Provide a valid link which contains 'https://'");
    }
  },
};
