module.exports = {
  name: 'guildMemberAdd',
  execute(member,client){
    const channelId = '820653558209708112'; //welcome
    const targetChannelId = '815477746310184962'; // rules-and-info
    const msg = `Welcome aboard <@${member.user.id}>! Please check out <#${targetChannelId}>`;

    const channel = member.guild.channels.cache.get(channelId);
    channel.send(msg);
  },
};
