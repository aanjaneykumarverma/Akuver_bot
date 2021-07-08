const Discord = require('discord.js');
const { version } = require('../../package.json');
module.exports = {
  name: 'botinfo',
  description: 'Displays information about the bot',
  usage: ' ',
  category: 'Misc',
  guildOnly: true,
  execute(message) {
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(
        `Information about the ${message.client.user.username}`,
        message.client.user.displayAvatarURL()
      )
      .addFields(
        { name: 'Bot tag', value: message.client.user.tag },
        { name: 'Version', value: version },
        {
          name: 'Time since last restart',
          value: `${process.uptime().toFixed(2)}s`,
        },
        { name: "Server's command prefix", value: '!' },
        { name: 'Server count', value: message.client.guilds.cache.size }
      );
    message.channel.send(embed);
  },
};
