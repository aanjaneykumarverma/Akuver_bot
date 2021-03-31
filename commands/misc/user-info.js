const Discord = require('discord.js');
const {version} = require('../../package.json');
module.exports = {
  name: 'userinfo',
  description: 'Displays information about the user.',
  usage: ' ',
  guildOnly: true,
  execute(message){
    const {guild, channel} = message;
    const user = message.mentions.users.first() || message.member.user;
    const member = guild.members.cache.get(user.id);

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(`User Info for ${user.username}`,
        user.displayAvatarURL()
      )
      .addFields(
        {name: 'User tag', value: user.tag,},
        {name: 'Is Bot', value: user.bot,},
        {name: 'Nickname', value: member.nickname || 'None',},
        {name: 'Joined Server', value:new Date(member.joinedTimestamp).toLocaleDateString(),},
        {name: 'Joined Discord', value:new Date(user.createdTimestamp).toLocaleDateString(),},
        {name: 'Roles', value: member.roles.cache.size - 1,},
      )
      channel.send(embed);
  },
};
